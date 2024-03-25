'use client'
import React, { useState } from 'react'
import Styles from './page.module.css'
import { IconButton, Typography, Button, Box, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import Divider from '@mui/material/Divider';
import { useRouter, useSearchParams } from 'next/navigation';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import type {Patient as RowData} from '@/app/components/getData'

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
      />
    );
  }

function RenderSelectWard(props: GridRenderCellParams<any, string>) {
    const [patientWard, setPatientWard] = useState('');
    const [selectEditable, setSelectEditable] = useState(false);
    const label = {inputProps: {'aria-label': 'Ward'}}
    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setPatientWard(event.target.value)
    };

    return (
        <Select  {...label}
        onChange={handleChange}
        sx={{width: '10vw', height: '5vh'}}
        inputProps={{readOnly: selectEditable}}> 
            <MenuItem value='Medical Ward'>Medical Ward</MenuItem>
            <MenuItem value='Surgical Ward'>Surgical Ward</MenuItem>
            <MenuItem value='Pediatrics Ward'>Pediatrics Ward</MenuItem>
            <MenuItem value='OB GYN Ward'>OB GYN Ward</MenuItem>
            <MenuItem value='CCU-MICU'>CCU-MICU</MenuItem>
            <MenuItem value='PRDL Ward'>PRDL Ward</MenuItem>
        </Select>
    )
}

function RenderSelectGender(props: GridRenderCellParams<any, string>) {
    const [patientGender, setPatientGender] = useState('');
    const [selectEditable, setSelectEditable] = useState(false);
    const label = {inputProps: {'aria-label': 'Gender'}}
    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setPatientGender(event.target.value)
    };

    return (
        <Select  {...label}
        onChange={handleChange}
        fullWidth
        sx={{height: '5vh'}}
        inputProps={{readOnly: selectEditable}}>
            <MenuItem value='M'>M</MenuItem>
            <MenuItem value='F'>F</MenuItem>
        </Select>
    )
}

function RenderSelectBlood(props: GridRenderCellParams<any, string>) {
    const [patientBloodType, setPatientBloodType] = useState('');
    const [selectEditable, setSelectEditable] = useState(false);
    const label = {inputProps: {'aria-label': 'Blood Type'}}
    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setPatientBloodType(event.target.value)
    };

    return (
        <Select  {...label}
        onChange={handleChange}
        fullWidth
        sx={{width: '5vw', height: '5vh'}}
        inputProps={{readOnly: selectEditable}}>
            <MenuItem value='A+'>A+</MenuItem>
            <MenuItem value=' A-'>A-</MenuItem>
            <MenuItem value='B+'>B+</MenuItem>
            <MenuItem value='B-'>B-</MenuItem>
            <MenuItem value='O+'>O+</MenuItem>
            <MenuItem value='O-'>O-</MenuItem>
            <MenuItem value='AB+'>AB+</MenuItem>
            <MenuItem value='AB-'>AB-</MenuItem>
        </Select>
    )
}

const NewPatientPage: React.FC = () => {
    const [rowEditable, setRowEditable] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const ward = searchParams.get('ward');

    const initialRows: GridRowsProp<RowData> = [
        {
            id: 123, 
            ward: 'Sakura Ward', 
            roomNumber: 'SH-101', 
            lastName: 'Lee', 
            givenName: 'Minji', 
            middleName: 'Sun', 
            age: 30, 
            sex: 'F', 
            patientNumber: 789456, 
            updated_at: new Date(),
            updated_by: 'Dr. Jones', 
            datetime_admitted: new Date(),
            religion: 'Buddhist', 
            doctor: 'Dr. Kim', 
            chiefComplaint: 'Stomach ache', 
            diagnosis: 'Appendicitis', 
            diet: 'Soft', 
            operation: 'Appendectomy', 
            activity: 'Bed rest', 
            allergies: 'Penicillin', 
            weightAndHeight: '50kg 170cm', 
            bloodType: 'A-', 
            phic: true,
            others: '',
            referral: '',
            dateOfBirth: new Date('2000-01-01'), 
            diagnosticTests: {
                '1': { diagnosticTest: 'Test 1', date: '2024-03-25', date_done: '2024-03-25' },
                '2': { diagnosticTest: 'Test 2', date: '2024-03-25', date_done: '2024-03-25' },
            },
            ivFluidBloodTransMedsIncorporated: {
                '1': { ivfbtic: 'Test 3', date: '2024-03-25', time_hooked: '2024-03-24T08:15:00Z'},
                '2': { ivfbtic: 'Test 4', date: '2024-03-25', time_hooked: '2024-03-24T08:15:00Z'}
            },
            mainMedications: {
                '1': { mainMedication: 'Test 5', date: '2024-03-25', time: '2024-03-24T08:15:00Z'},
                '2': { mainMedication: 'Test 6', date: '2024-03-25', time: '2024-03-24T08:15:00Z'}
            },
            prnMedications: {
                '1': { prnMedication: 'Test 7', date: '2024-03-25', time: '2024-03-24T08:15:00Z'},
                '2': { prnMedication: 'Test 8', date: '2024-03-25', time: '2024-03-24T08:15:00Z'}
            },
            treatments: {
                '1': { treatment: 'Test 7', date: '2024-03-25', time: '2024-03-24T08:15:00Z'},
                '2': { treatment: 'Test 8', date: '2024-03-25', time: '2024-03-24T08:15:00Z'}
            },
        }
    ];

    ward?.toString()
    const handleHome = () => {
        router.push('/homePage')
    }

    const patientColumn1: GridColDef<RowData>[] = [
        {field: 'patientNumber', headerName: 'Patient #', width: 85, editable: rowEditable, type: 'number'},
        {field: 'roomNumber', headerName: 'Room #', width: 75, editable: rowEditable},
        {field: 'lastName', headerName: 'Last Name', width: 100, editable: rowEditable},
        {field: 'givenName', headerName: 'Given Name', width: 210, editable: rowEditable},
        {field: 'middleName', headerName: 'Middle Name', width: 110, editable: rowEditable},
        {field: 'age', headerName: 'Age', width: 70, editable: rowEditable, type: 'number'},
        {field: 'sex', headerName: 'Sex', width: 80, editable: false, renderCell: RenderSelectGender}, 
        {field: 'datetime_admitted', headerName: 'Date/Time Admitted', width: 190, editable: rowEditable, type: 'dateTime' },
        {field: 'dateOfBirth', headerName: 'Date of Birth', width: 130, editable: rowEditable, type: 'date' }
    ];
    const patientColumn2: GridColDef<RowData>[] = [
        {field: 'religion', headerName: 'Religion', width: 80, editable: rowEditable},
        {field: 'phic', headerName: 'PHIC', width: 80, editable: false, renderCell: RenderCheckBox},
        {field: 'ward', headerName: 'Ward', width: 200, editable: false, renderCell: RenderSelectWard},
        {field: 'doctor', headerName: 'Doctor', width: 150, editable: rowEditable},
        {field: 'others', headerName: 'Others', width: 305, editable: rowEditable},
        {field: 'referral', headerName: 'Referral', width: 258, editable: rowEditable}
    ];
    const patientColumn3: GridColDef<RowData>[] = [
        {field: 'chiefComplaint', headerName: 'Chief Complaint', width: 360, editable: rowEditable},
        {field: 'diagnosis', headerName: 'Impression/Diagnosis', width: 355, editable: rowEditable},
        {field: 'operation', headerName: 'Operation/Performed Date', width: 355, editable: rowEditable},
    ];
    const patientColumn4: GridColDef<RowData>[] = [
        {field: 'diet', headerName: 'Diet', width: 200, editable: rowEditable},
        {field: 'activity', headerName: 'Activity', width: 200, editable: rowEditable},
        {field: 'allergies', headerName: 'Allergies', width: 200, editable: rowEditable},
        {field: 'weightAndHeight', headerName: 'Weight & Height', width: 200, editable: rowEditable},
        {field: 'bloodType', headerName: 'Blood Type', width: 200, editable: false, renderCell: RenderSelectBlood}
    ];
    const patientColumn5: GridColDef<RowData>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'diagnosticTest', headerName: 'Diagnostic Test', width: 310, editable: rowEditable},
        {field: 'date_done', headerName: 'Date done', width: 100, editable: rowEditable, type:'date'},
    ];
    const patientColumn6: GridColDef<RowData>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'ivfbtic', headerName: 'IVF/BT/INCORPORATED MEDS', width: 240, editable: rowEditable},
        {field: 'time_hooked', headerName: 'Time hooked', width: 180, editable: rowEditable, type:'dateTime'},
    ];
    const patientColumn7: GridColDef<RowData>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'mainMedication', headerName: 'Main Medication', width: 310, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 100, editable: rowEditable, type:'dateTime'},
    ];
    const patientColumn8: GridColDef<RowData>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'prnMedication', headerName: 'PRN Medication', width: 240, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 180, editable: rowEditable, type:'dateTime'},
    ];
    const patientColumn9: GridColDef<RowData>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date'},
        {field: 'treatment', headerName: 'Treatments', width: 240, editable: rowEditable},
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
        <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh', marginTop: '13vh' }}>
            <DataGrid columns={patientColumn1} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
        </div >
        <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
            <DataGrid columns={patientColumn2} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}}/>
        </div>
        <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
            <DataGrid columns={patientColumn3} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}}/>
        </div>
        <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
            <DataGrid columns={patientColumn4} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}}/>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', width: '98%'}}>
            <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn5} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}}/>
            </div>
            <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn6} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}}/>
            </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', width: '98%'}}>
            <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn7} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}}/>
            </div>
            <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn8} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}}/>
            </div>
        </div>
        <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn9} rows={initialRows} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{width: '47.75%', background: 'white'}}/>
        </div>
        </div>
    </div>
  )
}

export default NewPatientPage