'use client'
import React, { useEffect, useState } from 'react'
import Styles from './page.module.css'
import { IconButton, Typography, Button, Box, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import Divider from '@mui/material/Divider';
import { useRouter, useSearchParams } from 'next/navigation';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid';
import type {Patient as RowData} from '@/app/components/getData'
import {page as PatientData } from '@/app/components/getData'

const ViewKardexPage: React.FC = () => {
    const [rowEditable, setRowEditable] = useState(false);
    const [patients, setPatients] = useState<RowData[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const ward = searchParams.get('ward');
    const patientNumber = searchParams.get('patientNumber');
    const fileVersion = searchParams.get('fileVersion');
    const id = searchParams.get('id');
    ward?.toString()
    patientNumber?.toString()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await PatientData();
          const filteredPatients = res.patients.filter((patient) => patient.id === id)
          setPatients(filteredPatients);
        } catch (error) {
          console.error("error fetching data", error);
        }
      }
      fetchData()
    },[]);

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
            disabled={!rowEditable}
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

    const handleOnCellEditStop = () => {
        console.log()
    }

    const handleOnEditClick = () => {
        setRowEditable(true);
    }

    const handleOnSaveClick = () => {
      //something
      setRowEditable(false);
    }

    const handleHome = () => {
        router.push('/homePage')
    }

    const patientColumn1: GridColDef<RowData>[] = [
        {field: 'patientNumber', headerName: 'Patient #', width: 85, editable: rowEditable},
        {field: 'roomNumber', headerName: 'Room #', width: 75, editable: rowEditable},
        {field: 'lastName', headerName: 'Last Name', width: 100, editable: rowEditable},
        {field: 'givenName', headerName: 'Given Name', width: 210, editable: rowEditable},
        {field: 'middleName', headerName: 'Middle Name', width: 110, editable: rowEditable},
        {field: 'age', headerName: 'Age', width: 70, editable: rowEditable, type: 'number'},
        {field: 'sex', headerName: 'Sex', width: 80, editable: rowEditable, type: 'singleSelect', valueOptions: ['F', 'M']}, 
        {field: 'datetime_admitted', headerName: 'Date/Time Admitted', width: 190, editable: rowEditable, type: 'dateTime', valueGetter: (value) => new Date(value) },
        {field: 'dateOfBirth', headerName: 'Date of Birth', width: 130, editable: rowEditable, type: 'date', valueGetter: (value) => new Date(value) }
    ];
    const patientColumn2: GridColDef<RowData>[] = [
        {field: 'religion', headerName: 'Religion', width: 80, editable: rowEditable},
        {field: 'phic', headerName: 'PHIC', width: 80, editable: false, renderCell: RenderCheckBox},
        {field: 'ward', headerName: 'Ward', width: 200, editable: rowEditable, type:'singleSelect', 
        valueOptions: ['Medical Ward', 'Surgical Ward', 'Pediatrics Ward', 'OB GYN Ward', 'CCU', 'MICU', 'PICU', 'NCCU', 'PRDL Ward']},
        {field: 'doctor', headerName: 'Doctor', width: 150, editable: rowEditable},
        {field: 'referral', headerName: 'Referral', width: 243, editable: rowEditable},
        {field: 'others', headerName: 'Others', width: 295, editable: rowEditable},
    ];
    const patientColumn3: GridColDef<RowData>[] = [
        {field: 'chiefComplaint', headerName: 'Chief Complaint', width: 360, editable: rowEditable},
        {field: 'diagnosis', headerName: 'Impression/Diagnosis', width: 355, editable: rowEditable},
        {field: 'operation', headerName: 'Operation/Performed Date', width: 340, editable: rowEditable},
    ];
    const patientColumn4: GridColDef<RowData>[] = [
        {field: 'diet', headerName: 'Diet', width: 200, editable: rowEditable},
        {field: 'activity', headerName: 'Activity', width: 200, editable: rowEditable},
        {field: 'allergies', headerName: 'Allergies', width: 200, editable: rowEditable},
        {field: 'weightAndHeight', headerName: 'Weight & Height', width: 200, editable: rowEditable},
        {field: 'bloodType', headerName: 'Blood Type', width: 200, editable: rowEditable, type:'singleSelect', 
        valueOptions:['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-' ]}
    ];
    const patientColumn5: GridColDef<any>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date', valueGetter: (value) => new Date(value)},
        {field: 'diagnosticTest', headerName: 'Diagnostic Test', width: 310, editable: rowEditable, type: 'string'},
        {field: 'date_done', headerName: 'Date done', width: 100, editable: rowEditable, type:'date', valueGetter: (value) => new Date(value)},
    ];
    const patientColumn6: GridColDef<any>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date', valueGetter: (value) => new Date(value)},
        {field: 'ivfbtic', headerName: 'IVF/BT/INCORPORATED MEDS', width: 240, editable: rowEditable},
        {field: 'time_hooked', headerName: 'Time hooked', width: 180, editable: rowEditable, type:'dateTime', valueGetter: (value) => new Date(value)},
        {field: 'endorse', headerName: 'To Endorse, VS', width: 150, editable: rowEditable}
    ];
    const patientColumn7: GridColDef<any>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date', valueGetter: (value) => new Date(value)},
        {field: 'mainMedication', headerName: 'Main Medication', width: 310, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 100, editable: rowEditable},
    ];
    const patientColumn8: GridColDef<any>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date', valueGetter: (value) => new Date(value)},
        {field: 'prnMedication', headerName: 'PRN Medication', width: 240, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 180, editable: rowEditable, type:'dateTime', valueGetter: (value) => new Date(value)},
    ];
    const patientColumn9: GridColDef<any>[] = [
        {field: 'date', headerName: 'Date', width: 100, editable: rowEditable, type: 'date', valueGetter: (value) => new Date(value)},
        {field: 'treatment', headerName: 'Treatments', width: 240, editable: rowEditable},
        {field: 'time', headerName: 'Time', width: 180, editable: rowEditable, type:'dateTime', valueGetter: (value) => new Date(value)},
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
            <div style={{marginTop: '13.5vh', marginBottom: '0.5vh', display:'flex', justifyContent: 'flex-end', paddingRight: '1.4vw'}}>
                {rowEditable ? (
                  <Button variant='contained' sx={{borderRadius: 35, fontWeight: 'bold', background: '#203162'}} onClick={handleOnSaveClick}>Save</Button>
                ) : (
                  <Button variant='contained' sx={{borderRadius: 35, fontWeight: 'bold', background: '#203162'}} onClick={handleOnEditClick}>Edit</Button>
                )}
            </div>
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn1} rows={patients} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div >
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn2} rows={patients} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div>
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn3} rows={patients} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div>
            <div style={{ height: 110, width: '98%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn4} rows={patients} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', width: '98%'}}>
                <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                    <DataGrid columns={patientColumn5} rows={patients[0] ? patients[0].diagnosticTests : []} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                </div>
                <div style={{ height: 500, width: '79.2%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                    <DataGrid columns={patientColumn6} rows={patients[0] ? patients[0].ivFluidBloodTransMedsIncorporated : []} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                </div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', width: '98%'}}>
                <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                    <DataGrid columns={patientColumn7} rows={patients[0] ? patients[0].mainMedications: []} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                </div>
                <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                    <DataGrid columns={patientColumn8} rows={patients[0] ? patients[0].prnMedications : []} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{background: 'white'}} />
                </div>
            </div>
            <div style={{ height: 500, width: '100%', paddingLeft: '1.4vw', marginBottom: '0.5vh'}}>
                <DataGrid columns={patientColumn9} rows={patients[0] ? patients[0].treatments : []} hideFooter disableColumnSorting disableColumnMenu getRowId={(row) => row.id.toString()} sx={{width: '47.75%', background: 'white'}} />
            </div>
        </div>
    </div>
  )
}

export default ViewKardexPage