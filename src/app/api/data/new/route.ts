import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"
import type { PatientRes } from "@/app/components/getData"

export async function POST(request: NextRequest) {
    try {
        const payload: PatientRes = await request.json()
        const reformattedPayload: any = {}
        const arrayObjectPayload: any = {}
        Object.entries(payload.patients[0]).forEach(([key, value]) => {
            if (key === "diagnosticTests" || key === "ivFluidBloodTransMedsIncorporated" || key === "mainMedications" || key === "prnMedications" || key === "treatments") {
                return arrayObjectPayload[key.toLocaleLowerCase()] = value.map((entry: object) => (
                    Object.assign(
                        {}, 
                        ...Object.entries(entry).map(([subKey, subValue]) => (
                                { [subKey.toLowerCase()]: subValue }
                        )),
                        { patientid: payload.patients[0].id },
                        { fileversion: payload.patients[0].fileVersion }
                    )    
                ))
            }
            return reformattedPayload[key.toLocaleLowerCase()] = value
        })

        const patientResult = await sql.query(`
            DO $$
            DECLARE
            BEGIN
                INSERT INTO patients (
                    id, ward, fileversion, roomnumber, lastname, givenname, middlename,
                    age, sex, patientnumber, updated_at, updated_by, datetime_admitted, religion,
                    doctor, chiefcomplaint, diagnosis, diet, operation, activity, allergies, weightandheight,
                    bloodtype, phic, others, referral, dateofbirth
                )
                SELECT id, ward, fileversion, roomnumber, lastname, givenname, middlename,
                age, sex, patientnumber, updated_at, updated_by, datetime_admitted, religion,
                doctor, chiefcomplaint, diagnosis, diet, operation, activity, allergies, weightandheight,
                bloodtype, phic, others, referral, dateofbirth
                FROM json_populate_recordset(NULL::patients, '[${JSON.stringify(reformattedPayload)}]');    
                
                INSERT INTO diagnostic_tests (
                    patientid, fileversion, diagnostictest, date, date_done
                ) 
                SELECT patientid, fileversion, diagnostictest, date, date_done
                FROM json_populate_recordset(NULL::diagnostic_tests, '${JSON.stringify(arrayObjectPayload.diagnostictests)}');

                INSERT INTO main_medications (
                    patientid, fileversion, mainmedication, date, time
                ) 
                SELECT patientid, fileversion, mainmedication, date, time
                FROM json_populate_recordset(NULL::main_medications, '${JSON.stringify(arrayObjectPayload.mainmedications)}');

                INSERT INTO prn_medications (
                    patientid, fileversion, prnmedication, date, time
                ) 
                SELECT patientid, fileversion, prnmedication, date, time
                FROM json_populate_recordset(NULL::prn_medications, '${JSON.stringify(arrayObjectPayload.prnmedications)}');

                INSERT INTO ivfbtmi (
                    patientid, fileversion, ivfbtic, date, time_hooked, endorse
                ) 
                SELECT patientid, fileversion, ivfbtic, date, time_hooked, endorse
                FROM json_populate_recordset(NULL::ivfbtmi, '${JSON.stringify(arrayObjectPayload.ivfluidbloodtransmedsincorporated)}');

                INSERT INTO treatments (
                    patientid, fileversion, treatments, date, time
                ) 
                SELECT patientid, fileversion, treatments, date, time
                FROM json_populate_recordset(NULL::treatments, '${JSON.stringify(arrayObjectPayload.treatments)}');
            END $$;
        `)
        return NextResponse.json({ patientResult }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}