'use client'
import React, { useState } from 'react'
import styles from './login.module.css'
import { Typography, Button, TextField } from '@mui/material'

interface Users{
  firstname: string
  lastname: string
  username: string 
  password: string
}

const LoginPage = () => {
  
    const handleOnSubmit = () => {
        console.log("Submit")
    }

  return (
    <div className={styles.LoginPage}>
            <div className={styles.loginPageContent}>
                <Typography  variant='subtitle1' sx={{ color: '#ABD7FF', fontFamily: 'Dela Gothic One', fontSize:'32px'}} gutterBottom>
                    SLU SACRED HEART MEDICAL CENTER
                </Typography>
                <Typography sx={{ color: '#ABD7FF', fontFamily: 'Dela Gothic One', fontSize:'150px', marginTop: '-5rem', marginBottom:'-1rem'}} gutterBottom>
                    KARDEX
                </Typography>
                
            </div>
            <div className={styles.formContent}>
                <form noValidate autoComplete="off">
                    <div className={styles.loginForm}>
                        <TextField 
                            label="Username"
                            variant='filled'
                            margin="dense"
                            required
                            sx={{background: 'white', color: '#203162', borderRadius: 2}}
                            fullWidth
                            
                        />
                        <TextField 
                            label="Password"
                            variant='filled'
                            type="password"
                            margin="dense"
                            required
                            sx={{background: 'white', color: '#203162', borderRadius: 2}}
                            fullWidth
                            
                        />
                    </div>
                    <div className={styles.buttonContent}>
                        <Button variant='contained' size='large' color="primary" type="submit" sx={{color: '#203162', background: '#FFC610', borderRadius: 10}} onSubmit={handleOnSubmit}>
                                Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default LoginPage