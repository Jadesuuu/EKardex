'use client'
import React, { useState, Suspense } from 'react'
import Styles from './page.module.css'
import { IconButton, Typography, Button, Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import Divider from '@mui/material/Divider';
import { useRouter, useSearchParams } from 'next/navigation';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp  } from '@mui/x-data-grid';
import type { Patient as RowData } from '@/app/components/getData'
import {page as PatientData, createPatient } from '@/app/components/getData'

const NewPatientPage: React.FC = () => {
    const [rowEditable, setRowEditable] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const ward = searchParams.get('ward');

    interface SubTableDefaultProps {
        id: string
        date: string
    }

    interface DiagnosticTestsProps extends SubTableDefaultProps {
        diagnosticTest: string
        date_done: string
    }

    interface IFBTIProps extends SubTableDefaultProps {
        ivfbtic: string
        time_hooked: string
        endorse: string
    }

    interface MainMedicationsProps extends SubTableDefaultProps {
        mainMedication: string
        time: string
    }

    interface PRNMedicationsProps extends SubTableDefaultProps {
        prnMedication: string
        time: string
    }

    interface TreatmentsProps extends SubTableDefaultProps {
        treatment: string
        time: string
    }

    function RenderCheckBox(props: GridRenderCellParams<any, boolean>) {
        const [checked, setChecked] = React.useState(props.value); 
        const label = { inputProps : {'aria-label': 'PHIC'}};
       
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setChecked(event.target.checked);
        };
        
        return (
          <Checkbox
            {...label}
            size='medium'
            checked={checked} 
            onChange={handleChange} 
            sx={{
                color: '#203162',
                '&.Mui-checked': {
                  color: '#203162',
                },
              }}
          />
        );
      }

    const initialRows: GridRowsProp<RowData> = [{
        id: crypto.randomUUID(), 
        ward: '', 
        fileVersion: 1,
        roomNumber: '', 
        lastName: '', 
        givenName: '',
        middleName: '', 
        age: 0, 
        sex: '', 
        patientNumber: '', 
        updated_at: new Date(),
        updated_by: '', 
        datetime_admitted: new Date(),
        religion: '', 
        doctor: '', 
        chiefComplaint: '', 
        diagnosis: '', 
        diet: '', 
        operation: '', 
        activity: '', 
        allergies: '', 
        weightAndHeight: '', 
        bloodType: '', 
        phic: false,
        others: '',
        referral: '',
        dateOfBirth: '', 
        diagnosticTests: [
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
            {id: crypto.randomUUID(), diagnosticTest: '', date: '', date_done: ''},
        ],
        ivFluidBloodTransMedsIncorporated: [
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
            {id: crypto.randomUUID(), ivfbtic: '', date: '', time_hooked: '', endorse: ''},
        ],
        mainMedications: [
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), mainMedication: '', date: '', time: ''},

        ],
        prnMedications: [
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''},
            {id: crypto.randomUUID(), prnMedication: '', date: '', time: ''}
        ],
        treatments: [
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
            {id: crypto.randomUUID(), treatment: '', date: '', time: ''},
        ],
    }]

    const [patientData, setPatientData] = useState<GridRowsProp<RowData>>(initialRows);

    const handleOnFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()
        await createPatient(patientData[0])
        router.push(`/homePage/wardPages?ward=${ward}`);
    }

    const handleProcessRowUpdate = (updatedRow: RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps) => {
        
        if ("patientNumber" in updatedRow || "ward" in updatedRow) {
            alert('Patient Number and Ward cannot be empty')
            return updatedRow;
        }
        if("patientNumber" in updatedRow) {
            alert('Patient Number cannot be empty')
            return updatedRow;
        }
        if("ward" in updatedRow) {
            alert('Ward cannot be empty')
            return updatedRow;
        }

        console.log(updatedRow)
        if ("diagnosticTest" in updatedRow) {
            setPatientData([{ ...patientData[0], diagnosticTests: patientData[0].diagnosticTests.map(dt => dt.id === updatedRow.id ? updatedRow : dt)}])
        } else if ("ivfbtic" in updatedRow) {
            setPatientData([{ ...patientData[0], ivFluidBloodTransMedsIncorporated: patientData[0].ivFluidBloodTransMedsIncorporated.map(iv => iv.id === updatedRow.id ? updatedRow : iv)}])
        } else if ("mainMedication" in updatedRow) {
            setPatientData([{ ...patientData[0], mainMedications: patientData[0].mainMedications.map(m => m.id === updatedRow.id ? updatedRow : m)}])
        } else if ("prnMedication" in updatedRow) {
            setPatientData([{ ...patientData[0], prnMedications: patientData[0].prnMedications.map(prn => prn.id === updatedRow.id ? updatedRow : prn)}])
        } else if ("treatment" in updatedRow) {
            setPatientData([{ ...patientData[0], treatments: patientData[0].treatments.map(t => t.id === updatedRow.id ? updatedRow : t)}])
        } else {
            setPatientData([updatedRow])
        }
        return updatedRow
    }

    const handleHome = () => {
        router.push('/homePage')
    }

    const patientColumn1: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'patientNumber', headerName: 'Patient #', width: 85, editable: rowEditable, type: "number"},
        {field: 'roomNumber', headerName: 'Room #', width: 75, editable: rowEditable},
        {field: 'lastName', headerName: 'Last Name', width: 100, editable: rowEditable},
        {field: 'givenName', headerName: 'Given Name', width: 210, editable: rowEditable},
        {field: 'middleName', headerName: 'Middle Name', width: 110, editable: rowEditable},
        {field: 'age', headerName: 'Age', width: 70, editable: rowEditable, type: 'number'},
        {field: 'sex', headerName: 'Sex', width: 80, editable: rowEditable, type: 'singleSelect', valueOptions: ['F', 'M']}, 
        {field: 'datetime_admitted', headerName: 'Date/Time Admitted', width: 190, editable: rowEditable, type: 'dateTime' },
        {field: 'dateOfBirth', headerName: 'Date of Birth', width: 130, editable: rowEditable, type: 'date' }
    ];
    const patientColumn2: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'religion', headerName: 'Religion', width: 80, editable: rowEditable},
        {field: 'phic', headerName: 'PHIC', width: 80, editable: false, renderCell: RenderCheckBox},
        {field: 'ward', headerName: 'Ward', width: 200, editable: rowEditable, type:'singleSelect', 
        valueOptions: ['Medical Ward', 'Surgical Ward', 'Pediatrics Ward', 'OB GYN Ward', 'CCU', 'MICU', 'PICU', 'NCCU', 'PRDL Ward']},
        {field: 'doctor', headerName: 'Doctor', width: 150, editable: rowEditable},
        {field: 'referral', headerName: 'Referral', width: 258, editable: rowEditable},
        {field: 'others', headerName: 'Others', width: 295, editable: rowEditable},
    ];  
    const patientColumn3: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'chiefComplaint', headerName: 'Chief Complaint', width: 360, editable: rowEditable},
        {field: 'diagnosis', headerName: 'Impression/Diagnosis', width: 355, editable: rowEditable},
        {field: 'operation', headerName: 'Operation/Performed Date', width: 355, editable: rowEditable},
    ];
    const patientColumn4: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'diet', headerName: 'Diet', width: 200, editable: rowEditable},
        {field: 'activity', headerName: 'Activity', width: 200, editable: rowEditable},
        {field: 'allergies', headerName: 'Allergies', width: 200, editable: rowEditable},
        {field: 'weightAndHeight', headerName: 'Weight & Height', width: 200, editable: rowEditable},
        {field: 'bloodType', headerName: 'Blood Type', width: 200, editable: rowEditable, type:'singleSelect', 
        valueOptions:['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-' ]}
    ];
    const patientColumn5: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'diagnosticTest', headerName: 'Diagnostic Test', width: 310, editable: rowEditable, type: 'string'},
        {field: 'date_done', headerName: 'Date done', width: 100, editable: rowEditable, type:'date'},
    ];
    const patientColumn6: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'ivfbtic', headerName: 'IVF/BT/INCORPORATED MEDS', width: 240, editable: rowEditable},
        {field: 'time_hooked', headerName: 'Time hooked', width: 180, editable: rowEditable, type:'dateTime'},
        {field: 'endorse', headerName: 'To Endorse, VS', width: 150, editable: rowEditable}
    ];
    const patientColumn7: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'mainMedication', headerName: 'Main Medication', width: 310, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 100, editable: rowEditable},
    ];
    const patientColumn8: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'prnMedication', headerName: 'PRN Medication', width: 240, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 180, editable: rowEditable, type:'dateTime'},
    ];
    const patientColumn9: GridColDef<RowData | DiagnosticTestsProps | IFBTIProps | MainMedicationsProps | PRNMedicationsProps | TreatmentsProps>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'treatment', headerName: 'Treatments', width: 237, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 180, editable: rowEditable, type:'dateTime'},
    ];
  return (
    <div className={Styles.NewPatient}>
        <div className={Styles.formPage}>
            <div className={Styles.wardHeader}>
                <IconButton onClick={handleHome} sx={{paddingLeft: '1.5vw'}}>
                    <HouseIcon sx={{background: '#203162', color: 'white', borderRadius: 35, padding: 0.36, fontSize: '35px'}}/>
                    <Typography variant='h4' sx={{color: '#203162', fontWeight: 'bold', paddingLeft: '1vw'}}>{ward}</Typography>
                </IconButton>
            <div className={Styles.iconAndName}>
                <IconButton sx={{color: '#ABD7FF', marginTop: '-8vh', marginLeft:'49.2vw'}}>
                    <AccountCircleIcon sx={{color: '#203162', fontSize: '35px'}} />
                    <Typography variant='h5' sx={{color: '#203162', fontWeight: 'bold', paddingLeft: '0.2vw'}}>A2 Benner</Typography>
                </IconButton>
            </div>
            <div className={Styles.divider}>
                <Divider variant="middle" sx={{width: '95%', background: '#203162', height: '2px', marginTop: '-5vh'}}/>
            </div>
        </div>
            <div style={{marginTop: '13vh', marginBottom: '0.5vh', display:'flex', justifyContent: 'flex-end', paddingRight: '1.4vw'}}>
                <Button variant='contained' sx={{borderRadius: 35, fontWeight: 'bold', background: '#203162'}} onClick={(e) => (async() => handleOnFormSubmit(e))()}>Create Patient</Button>
            </div>
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn1} rows={patientData as RowData[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div >
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn2} rows={patientData as RowData[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div>
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn3} rows={patientData as RowData[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div>
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn4} rows={patientData as RowData[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div>
            <div style={{marginBottom: '0.5vh', height: '500px', paddingLeft: '1.4vw'}}>
                <Grid container spacing={1} >
                    <Grid item xs={5.88}>
                        <DataGrid columns={patientColumn5} rows={patientData[0].diagnosticTests as DiagnosticTestsProps[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                    </Grid>
                    <Grid item xs={5.88}>
                        <DataGrid columns={patientColumn6} rows={patientData[0].ivFluidBloodTransMedsIncorporated as IFBTIProps[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                    </Grid>
                    <Grid item xs={5.88}>
                        <DataGrid columns={patientColumn7} rows={patientData[0].mainMedications as MainMedicationsProps[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                    </Grid>
                    <Grid item xs={5.88}>
                        <DataGrid columns={patientColumn8} rows={patientData[0].prnMedications as PRNMedicationsProps[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                    </Grid>
                </Grid>
            </div>
            <div style={{ height: 1203, width: '89.9vw', paddingLeft: '30.4vw', paddingTop: '73.37vh', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn9} rows={patientData[0].treatments as TreatmentsProps[]} processRowUpdate={handleProcessRowUpdate} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{width: '47.75%', background: 'white'}} />
            </div>
        </div>
    </div>
  )
}

const PageWrapper = () => <Suspense fallback={<div>Loading ward data...</div>}><NewPatientPage /></Suspense>

export default PageWrapper