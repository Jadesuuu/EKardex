import { Patient } from "@/app/components/getData"
import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const payload = await request.json()
        const edit: Patient = payload
        const editedPatientForDatabase = {
            id: edit.id,
            ward: edit.ward,
            fileversion: edit.fileVersion,
            roomnumber: edit.roomNumber,
            lastname: edit.lastName,
            givenname: edit.givenName,
            middlename: edit.middleName,
            age: edit.age,
            sex: edit.sex,
            patientnumber: edit.patientNumber,
            updated_at: new Date(),
            updated_by: edit.updated_by,
            datetime_admitted: edit.datetime_admitted,
            religion: edit.religion,
            doctor: edit.doctor,
            chiefcomplaint: edit.chiefComplaint,
            diagnosis: edit.diagnosis,
            diet: edit.diet,
            operation: edit.operation,
            activity: edit.activity,
            allergies: edit.allergies,
            weightandheight: edit.weightAndHeight,
            bloodtype: edit.bloodType,
            phic: edit.phic,
            others: edit.others,
            referral: edit.referral,
            dateofbirth: edit.dateOfBirth
        }

        const diagnosticTests = edit.diagnosticTests.map(dt => ({ id: dt.id, patientid: edit.id, fileversion: edit.fileVersion, diagnostictest: dt.diagnosticTest, date: dt.date, date_done: dt.date_done }))
        const mainMedications = edit.mainMedications.map(mm => ({ id: mm.id, patientid: edit.id, fileversion: edit.fileVersion, mainmedication: mm.mainMedication, date: mm.date, time: mm.time }))
        const prnMedications = edit.prnMedications.map(pm => ({ id: pm.id, patientid: edit.id, fileversion: edit.fileVersion, prnmedication: pm.prnMedication, date: pm.date, time: pm.time }))
        const ivfbtmi = edit.ivFluidBloodTransMedsIncorporated.map(i => ({ id: i.id, patientid: edit.id, fileversion: edit.fileVersion, ivfbtic: i.ivfbtic, date: i.date, time_hooked: i.time_hooked, endorse: i.endorse }))
        const treatments = edit.treatments.map(t => ({ id: t.id, patientid: edit.id, fileversion: edit.fileVersion, treatment: t.treatment, date: t.date, time: t.time }))

        console.log(diagnosticTests, mainMedications, prnMedications, ivfbtmi, treatments)

        const result = await sql.query(`
            DO $$
            DECLARE
            BEGIN
                UPDATE patients
                SET (
                        id, ward, fileversion, roomnumber, lastname, givenname, middlename, age, sex,
                        patientnumber, updated_at, updated_by, datetime_admitted, religion,
                        doctor, chiefcomplaint, diagnosis, diet, operation, activity, allergies,
                        weightandheight, bloodtype, phic, others, referral, dateofbirth
                    ) = ((
                            SELECT id, ward, fileversion, roomnumber, lastname, givenname, middlename, age, sex,
                            patientnumber, updated_at, updated_by, datetime_admitted, religion,
                            doctor, chiefcomplaint, diagnosis, diet, operation, activity, allergies,
                            weightandheight, bloodtype, phic, others, referral, dateofbirth 
                            FROM json_populate_recordset(NULL::patients, '[${JSON.stringify(editedPatientForDatabase)}]')
                        ))
                WHERE id = '${editedPatientForDatabase.id}';

                UPDATE diagnostic_tests
                SET
                    fileversion = dtu.fileversion,
                    diagnostictest = dtu.diagnostictest,
                    date = dtu.date,
                    date_done = dtu.date_done
                FROM (
                    SELECT *
                    FROM json_populate_recordset(NULL::diagnostic_tests, '${JSON.stringify(diagnosticTests)}')
                ) dtu
                WHERE diagnostic_tests.id = dtu.id;

                UPDATE main_medications
                SET
                    fileversion = mmu.fileversion,
                    mainmedication = mmu.mainmedication,
                    date = mmu.date,
                    time = mmu.time
                FROM (
                    SELECT *
                    FROM json_populate_recordset(NULL::main_medications, '${JSON.stringify(mainMedications)}')
                ) mmu
                WHERE main_medications.id = mmu.id;

                UPDATE prn_medications
                SET
                    fileversion = pmu.fileversion,
                    prnmedication = pmu.prnmedication,
                    date = pmu.date,
                    time = pmu.time
                FROM (
                    SELECT *
                    FROM json_populate_recordset(NULL::prn_medications, '${JSON.stringify(prnMedications)}')
                ) pmu
                WHERE prn_medications.id = pmu.id;

                UPDATE ivfbtmi
                SET
                    fileversion = iu.fileversion,
                    ivfbtic = iu.ivfbtic,
                    date = iu.date,
                    time_hooked = iu.time_hooked,
                    endorse = iu.endorse
                FROM (
                    SELECT *
                    FROM json_populate_recordset(NULL::ivfbtmi, '${JSON.stringify(ivfbtmi)}')
                ) iu
                WHERE ivfbtmi.id = iu.id;

                UPDATE treatments
                SET
                    fileversion = tu.fileversion,
                    treatment = tu.treatment,
                    date = tu.date,
                    time = tu.time
                FROM (
                    SELECT *
                    FROM json_populate_recordset(NULL::treatments, '${JSON.stringify(treatments)}')
                ) tu
                WHERE treatments.id = tu.id;
            END $$;
        `)
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}