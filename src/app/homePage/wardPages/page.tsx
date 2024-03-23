'use client'
import React, { useEffect, useState } from 'react'
import Styles from './page.module.css'
import { IconButton, Typography, Button } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import { useRouter, useSearchParams } from 'next/navigation';
import Divider from '@mui/material/Divider';
import SearchBar from '@/app/components/searchBar';
import Table from '@/app/components/gridTable';

interface Patient {
  roomNumber: number;
  lastName: string;
  givenName: string;
  middleName?: string;
  age: number;
  sex: string;
  patientNumber: number;
  diagnosis: string;
}

const WardPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const searchParams = useSearchParams();
    const ward = searchParams.get('ward');
    ward?.toString()

    const samplePatients: Patient[] = [
      {
        roomNumber: 101,
        lastName: "Doe",
        givenName: "John",
        middleName: "James",
        age: 35,
        sex: "Male",
        patientNumber: 12345,
        diagnosis: 'highblood'
      },
      {
        roomNumber: 102,
        lastName: "Ulep",
        givenName: "Alexis Nicole",
        middleName: "Damayo",
        age: 35,
        sex: "Female",
        patientNumber: 12346,
        diagnosis: 'highblood'
      }
    ]

    useEffect(() => {
      const storedPatients = localStorage.getItem('patients');
      if (storedPatients) {
        setPatients(JSON.parse(storedPatients) as Patient[]);
      } else {
        localStorage.setItem('patients', JSON.stringify(samplePatients));
        setPatients(samplePatients);
      }
      setIsLoading(false);
    }, []);

    const handleHome = () => {
        router.push('/homePage')
    }
    
    const handleNewPatient = () => {
      router.push('/homePage/wardPages/patientFormPage')
    }

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
          <Table data={samplePatients}/>
        </div>
    </div>
  )
}

export default WardPage