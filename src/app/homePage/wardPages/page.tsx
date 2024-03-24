'use client'
import React, { useEffect, useState } from 'react'
import Styles from './page.module.css'
import { IconButton, Typography, Button, Box } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import { useRouter, useSearchParams } from 'next/navigation';
import Divider from '@mui/material/Divider';
import {page as PatientData } from '@/app/components/getData'
import type {Patient} from '@/app/components/getData'
import { DataGrid, GridToolbar, GridRowSelectionModel } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const columns = [
  { field: 'roomNumber', headerName: 'ROOM #', width: 150 },
  { field: 'lastName', headerName: 'LAST NAME', width: 150 },
  { field: 'givenName', headerName: 'FIRST NAME', width: 200 },
  { field: 'middleName', headerName: 'MIDDLE NAME', width: 150 },
  { field: 'age', headerName: 'AGE', width: 110 },
  { field: 'sex', headerName: 'SEX', width: 110 },
  { field: 'patientNumber', headerName: 'PATIENT NUMBER', width: 200 },
];

const WardPage: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedRows, setSelectedRows] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const searchParams = useSearchParams();
    const ward = searchParams.get('ward');
    ward?.toString()

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await PatientData()
          const filteredPatients = res.patients.filter((patient) => patient.ward === ward)
          setPatients(filteredPatients)
          setIsLoading(false)
        } catch (error) {
          console.error("error fetching data", error)
        }
      }
      fetchData()
    },[])

    const handleHome = () => {
        router.push('/homePage')
    }
    
    const handleNewPatient = () => {
      router.push(`/homePage/wardPages/newPatientPage?ward=${ward}`)
    }

    const handlePatientRow = () => {
      router.push('/homePage/wardPages/kardexHistoryPage')
    }

    const handleRowDelete = async () => { //next time na to pota
      if (!selectedRows.length) return; 

      const confirmed = window.confirm(`Are you sure you want to delete ${selectedRows.length} patient(s)?`);
        if (!confirmed) return;

      const filteredPatients = patients.filter(
        (patient) => !selectedRows.some((selected) => selected.patientNumber === patient.patientNumber)
    );

    setPatients(filteredPatients);
    setSelectedRows([]);
  };

  return (
    <div className={Styles.WardPage}>
        <div className={Styles.wardHeader}>
            <IconButton onClick={handleHome} disabled={isLoading}>
                <HouseIcon sx={{background: '#203162', color: '#86C2F8', borderRadius: 35, padding: 0.36, fontSize: '50px'}}/>
                <Typography variant='h2' sx={{color: '#203162', fontWeight: 'bold', paddingLeft: '1vw'}}>{ward}</Typography>
            </IconButton>
            <div className={Styles.iconAndName}>
                <IconButton sx={{color: '#ABD7FF', paddingTop: '3.5vh', marginLeft:'50.2vw'}} disabled={isLoading}>
                    <AccountCircleIcon sx={{color: '#203162', fontSize: '35px'}} />
                    <Typography variant='h5' sx={{color: '#203162', fontWeight: 'bold', paddingLeft: '0.2vw'}}>A2 Benner</Typography>
                </IconButton>
            </div>
        </div>
        <div className={Styles.divider}>
            <Divider variant="middle" sx={{width: '85vw', background: 'white', height: '2px'}}/>
        </div>
        <div className={Styles.WardContent}>
        <Button 
          onClick={handleNewPatient} 
          variant='contained' 
          sx={{
            background: '#203162', 
            color: 'white', 
            borderRadius: 10, 
            fontWeight: 'bold', 
            width:'11.5vw',
            height:'5vh', 
            fontSize:'19px', 
            marginLeft: '7.5vw',}}
            disabled={isLoading}>
            ADD NEW PATIENT
          </Button>
        </div>
        <div className={Styles.table}>
          <Box sx={{ height: 650, width: '85.1vw', marginTop: '0.5%', background: 'white'}}>
            <DataGrid 
              rows={patients} 
              columns={columns} 
              getRowId={(row) => row.patientNumber} 
              slots={{toolbar: GridToolbar}} 
              slotProps={{toolbar: {showQuickFilter: true}}}
              sx={{
                '& .MuiDataGrid-columnHeader': {
                  color: '#203162', 
                  fontWeight: 'bold'
                },
              }}
            />
          </Box>
        </div>
    </div>
  )
}

export default WardPage