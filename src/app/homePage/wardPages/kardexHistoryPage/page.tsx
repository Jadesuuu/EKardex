'use client'
import React, { useEffect, useState } from 'react'
import Styles from './page.module.css'
import { IconButton, Typography, Button, Box, Grid } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import { useRouter, useSearchParams } from 'next/navigation';
import Divider from '@mui/material/Divider';
import {page as PatientData } from '@/app/components/getData'
import type {Patient} from '@/app/components/getData'
import { DataGrid, GridToolbar, GridRowSelectionModel, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import type {Patient as RowData} from '@/app/components/getData'
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const KardexHistoryPage: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedRows, setSelectedRows] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const searchParams = useSearchParams();
    const ward = searchParams.get('ward');
    const patientNumber = searchParams.get('patientNumber');
    const roomNumber = searchParams.get('roomNumber');
    const lastName = searchParams.get('lastName');
    const givenName = searchParams.get('givenName');
    const middleName = searchParams.get('middleName');
    const age = searchParams.get('age');
    const sex = searchParams.get('sex');
    ward?.toString();
    patientNumber?.toString();
    roomNumber?.toString();
    lastName?.toString();
    givenName?.toString();
    middleName?.toString();
    age?.toString();
    sex?.toString();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await PatientData();
          const filteredPatients = res.patients.filter((patient) => patient.patientNumber == patientNumber);
          setPatients(filteredPatients);
          setIsLoading(false);
        } catch (error) {
          console.error("error fetching data", error);
        }
      }
      fetchData()
    },[]);

    const handleDeleteOnClick = () => {
      console.log('delete clicked')
    }

    const handleDuplicateOnClick = () => {
      console.log('duplicate clicked')
    }
    
    const column2: GridColDef<RowData>[] = [  
      { field: 'updated_at', headerName: 'Last Updated', width: 350, editable: false, type: 'dateTime', valueGetter: (value) => new Date(value), },
      { field: 'updated_by', headerName: 'Updated By', width: 350, editable: false},
      { field: 'actions', type: 'actions', getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<DeleteIcon />} onClick={handleDeleteOnClick} label='Delete' />,
        <GridActionsCellItem icon={<ContentCopyIcon />} onClick={handleDuplicateOnClick} label='Duplicate' />,
      ]}
    ]

    const handleHome = () => {
        router.push('/homePage')
    }
    
    const handleNewPatient = () => {
      router.push(`/homePage/wardPages/newPatientPage?ward=${ward}`)
    }

    const handlePatientRow = () => {
      router.push('/homePage/wardPages/kardexHistoryPage')
    }

  return (
    <div className={Styles.WardPage}>
        <div className={Styles.wardHeader}>
            <IconButton onClick={handleHome} disabled={isLoading}>
                <HouseIcon sx={{background: 'white', color: '#203162', borderRadius: 35, padding: 0.36, fontSize: '50px'}}/>
                <Typography variant='h2' sx={{color: 'white', fontWeight: 'bold', paddingLeft: '1vw'}}>{ward}</Typography>
            </IconButton>
            <div className={Styles.iconAndName}>
                <IconButton sx={{color: 'white', paddingTop: '3.5vh', marginLeft:'50.2vw'}} disabled={isLoading}>
                    <AccountCircleIcon sx={{color: 'white', fontSize: '35px'}} />
                    <Typography variant='h5' sx={{color: 'white', fontWeight: 'bold', paddingLeft: '0.2vw'}}>A2 Benner</Typography>
                </IconButton>
            </div>
        </div>
        <div className={Styles.divider}>
            <Divider variant="middle" sx={{width: '85vw', background: 'white', height: '2px'}}/>
        </div>
        <div className={Styles.patientNameTitle}>
          <Grid container spacing={1} sx={{paddingLeft: '8vw', paddingTop: '2vh', paddingBottom: '2vh'}}> 
            <Grid item xs={1}>
              <Typography variant='h4' sx={{color: 'white', fontWeight: 'bold'}}>{roomNumber} </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='h4' sx={{color: 'white', fontWeight: 'bold'}}>{lastName} </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='h4' sx={{color: 'white', fontWeight: 'bold'}}>{givenName} </Typography>
            </Grid>
            <Grid item xs={1}>  
              <Typography variant='h4' sx={{color: 'white', fontWeight: 'bold'}}>{middleName} </Typography>
            </Grid>
            <Grid item xs={1}>  
              <Typography variant='h4'sx={{color: 'white', fontWeight: 'bold'}}>{age} </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant='h4' sx={{color: 'white', fontWeight: 'bold'}}>{sex} </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant='h4'sx={{color: 'white', fontWeight: 'bold'}}>{patientNumber} </Typography>
            </Grid>
          </Grid>
        </div>
        <div className={Styles.table}>
          <Box sx={{ height: 650, width: '85.1vw', marginTop: '0.5%', background: 'white'}}>
            <DataGrid
              rows={patients} 
              columns={column2} 
              getRowId={(row) => row.id} 
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

export default KardexHistoryPage