'use client'
import React from 'react'
import dajs from 'dayjs'
import Styles from './page.module.css'
import { IconButton, Typography, Button, Box, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';
import Divider from '@mui/material/Divider';
import { useRouter, useSearchParams } from 'next/navigation';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import { Grid } from "@mui/material";


const NewPatientPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ward = searchParams.get('ward');

    ward?.toString()
    const handleHome = () => {
        router.push('/homePage')
    }
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
        </div>
            <div className={Styles.divider}>
                <Divider variant="middle" sx={{width: '95%', background: '#203162', height: '2px', marginTop: '-5vh'}}/>
            </div>
        {/* <div className={Styles.form}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormControl sx={{width: '13vw', marginLeft: '1.5vw'}}>
                <Grid item xs={4}>
                    <div className={Styles.form1}>
                                <InputLabel id="wardLabel">Ward</InputLabel>
                                    <Select labelId='wardLabel'
                                    id='wardLabel'
                                    label='Ward'
                                    required>
                                        <MenuItem value='Medical Ward'>Medical Ward</MenuItem>
                                        <MenuItem value='Surgical Ward'>Surgical Ward</MenuItem>
                                        <MenuItem value='Pediatrics Ward'>Pediatrics Ward</MenuItem>
                                        <MenuItem value='OB GYN Ward'>OB GYN Ward</MenuItem>
                                        <MenuItem value='CCU-MICU'>CCU-MICU</MenuItem>
                                        <MenuItem value='PRDL Ward'>PRDL Ward</MenuItem>
                                    </Select>
                        <TextField label='Room #' variant='outlined' type='text' required ></TextField>
                        <TextField label='Last Name' variant='outlined' type='text' required></TextField>
                        <TextField label='First Name' variant='outlined' type='text' required></TextField>
                        <TextField label='Middle Name' variant='outlined' type='text'></TextField>
                    </div>
                </Grid>
                <div className={Styles.form2}>
                    <Container style={{ display: 'flex' }}>
                        <InputLabel id="sexLabel">Sex</InputLabel>
                            <Select
                                labelId="sexlabel"
                                id="sexLabel"
                                label="Sex"
                                required
                            >
                                <MenuItem value='M'>M</MenuItem>
                                <MenuItem value='F'>F</MenuItem>
                            </Select>
                        <TextField label='Age' variant='outlined' type='number' required sx={{width: '6vw', marginTop: '1vh'}}></TextField>
                        <DateTimePicker label="Date/Time Admitted" sx={{marginTop: '1vh'}}/>
                        <TextField label='Religion' variant='outlined' type='text' sx={{marginTop: '1vh'}}></TextField>
                        <TextField label='Doctor' variant='outlined' type='text' sx={{marginTop: '1vh', width: '21.2vw'}}></TextField>
                    </Container>
                </div>
                <div className={Styles.form3}>
                    <Container style={{ display: 'flex' }}>
                        <DatePicker label="Date of Birth" />
                        <TextField label='Others' variant='outlined' type='text' sx={{marginTop: '1vh', width: '20vw'}}></TextField>
                        <TextField label='Referral' variant='outlined' type='text' sx={{marginTop: '1vh', width: '20vw'}}></TextField>
                    </Container>
                </div>
                </FormControl>
                </LocalizationProvider>
        </div> */}
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl sx={{marginLeft:'1.3vw'}}>
                    <Grid sx={{marginBottom: '1vh'}}>
                        <InputLabel id="wardLabel">Ward</InputLabel>
                            <Select 
                            labelId='wardLabel' 
                            id='ward' 
                            label='Ward' 
                            required 
                            sx={{width:'10vw'}}>
                                <MenuItem value='Medical Ward'>Medical Ward</MenuItem>
                                <MenuItem value='Surgical Ward'>Surgical Ward</MenuItem>
                                <MenuItem value='Pediatrics Ward'>Pediatrics Ward</MenuItem>
                                <MenuItem value='OB GYN Ward'>OB GYN Ward</MenuItem>
                                <MenuItem value='CCU-MICU'>CCU-MICU</MenuItem>
                                <MenuItem value='PRDL Ward'>PRDL Ward</MenuItem>
                            </Select>
                        <TextField label='Room #' variant='outlined' type='text' required/>
                        <TextField label='Last Name' variant='outlined' type='text' required/>
                        <TextField label='First Name' variant='outlined' type='text' required/>
                        <TextField label='Middle Name' variant='outlined' type='text'/>
                    </Grid>
                    <Grid sx={{marginBottom: '1vh'}}>
                    <InputLabel id="sexLabel">Sex</InputLabel>
                        <Select labelId="sexlabel" id="sex" label="Sex" required sx={{width: '4vw'}}>
                                <MenuItem value='M'>M</MenuItem>
                                <MenuItem value='F'>F</MenuItem>
                            </Select>
                        <TextField label='Age' variant='outlined' type='number' required sx={{width: '6vw', marginTop: '1vh'}}/>
                        <DateTimePicker label="Date/Time Admitted" sx={{marginTop: '1vh'}}/>
                        <TextField label='Religion' variant='outlined' type='text' sx={{marginTop: '1vh'}}/>
                        <TextField label='Doctor' variant='outlined' type='text' sx={{marginTop: '1vh', width: '21.2vw'}}/>
                    </Grid>
                    <Grid sx={{marginBottom: '1vh'}}>
                        <DatePicker label="Date of Birth" />
                        <TextField label='Others' variant='outlined' type='text' sx={{marginTop: '1vh', width: '20vw'}}/>
                        <TextField label='Referral' variant='outlined' type='text' sx={{marginTop: '1vh', width: '20vw'}}/>
                    </Grid>
                </FormControl>
            </LocalizationProvider>
        </div>
        </div>
    </div>
  )
}

export default NewPatientPage