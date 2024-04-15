import { Patient } from "@/app/components/getData";
import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { rows } = await sql`SELECT * FROM patients LIMIT ALL;`
        const { rows: dtRows } = await sql`SELECT * FROM diagnostic_tests LIMIT ALL;`
        const { rows: iRows } = await sql`SELECT * FROM ivfbtmi LIMIT ALL;`
        const { rows: mmRows} = await sql`SELECT * FROM main_medications LIMIT ALL;`
        const { rows: pmRows } = await sql`SELECT * FROM prn_medications LIMIT ALL;`
        const { rows: tRows } = await sql`SELECT * FROM treatments LIMIT ALL;`
        const dbResponse = rows.map(row => {
            const patient: Patient = {
                id: row.id,
                ward: row.ward,
                fileVersion: row.fileversion,
                roomNumber: row.roomnumber,
                lastName: row.lastname,
                givenName: row.givenname,
                middleName: row.middlename,
                age: row.age,
                sex: row.sex,
                patientNumber: row.patientnumber,
                updated_at: row.updated_at,
                updated_by: row.updated_by,
                datetime_admitted: row.datetime_admitted,
                religion: row.religion,
                doctor: row.doctor,
                chiefComplaint: row.chiefcomplaint,
                diagnosis: row.diagnosis,
                diet: row.diet,
                operation: row.operation,
                activity: row.activity,
                allergies: row.allergies,
                weightAndHeight: row.weightandheight,
                bloodType: row.bloodType,
                phic: row.phic,
                others: row.others,
                referral: row.referral,
                dateOfBirth: row.dateofbirth,
                diagnosticTests: dtRows.filter(dt => dt.fileversion === row.fileversion && dt.patientid === row.id).map(dt => ({ id: dt.id, diagnosticTest: dt.diagnostictest, date: dt.date, date_done: dt.date_done })),
                ivFluidBloodTransMedsIncorporated: iRows.filter(i => i.fileversion === row.fileversion && i.patientid === row.id).map(i => ({ id: i.id, ivfbtic: i.ivfbtic, date: i.date, time_hooked: i.time_hooked, endorse: i.endorse })),
                mainMedications: mmRows.filter(mm => mm.fileversion === row.fileversion && mm.patientid === row.id).map(mm => ({ id: mm.id, mainMedication: mm.mainmedication, date: mm.date, time: mm.time })),
                prnMedications: pmRows.filter(pm => pm.fileversion === row.fileversion && pm.patientid === row.id).map(pm => ({ id: pm.id, prnMedication: pm.prnmedication, date: pm.date, time: pm.time })),
                treatments: tRows.filter(t => t.id === row.id && t.patientid === row.id).map(t => ({ id: t.id, treatment: t.treatment, date: t.date, time: t.time }))
            }
            return patient
        })

        const response = { patients: dbResponse }
        
        return NextResponse.json({ response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}


export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()
        const response = await sql.query(`
            DO $$
            DECLARE
            BEGIN
                DELETE FROM diagnostic_tests WHERE patientid = '${id}';
                DELETE FROM main_medications WHERE patientid = '${id}';
                DELETE FROM ivfbtmi WHERE patientid = '${id}';
                DELETE FROM prn_medications WHERE patientid = '${id}';
                DELETE FROM treatments WHERE patientid = '${id}';
                DELETE FROM patients WHERE id = '${id}';
            END $$;
        `)
        return NextResponse.json({ response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
