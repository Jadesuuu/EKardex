'use client'
import React, { FormEvent, FormEventHandler, useState } from 'react';
import Styles from './page.module.css';
import { Alert, AlertTitle, Typography, Button, TextField, Stack, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const router = useRouter();
    const validUsername = 'test123';
    const validPassword = 'pass123';

    const handleOnChangeUser = (event: { target: { value: React.SetStateAction<string> }}) => {
        setUsername(event.target.value);
    }

    const handleOnChangePass = (event: { target: { value: React.SetStateAction<string> }}) => {
        setPassword(event.target.value);
    }

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(username === validUsername && password === validPassword) {
            try {
                router.push('/homePage');
            } catch (error) {
                console.error('Error redirecting', error);
            }
        } else {
            setShowError(true);
            console.error('wrong password');
        }
    }

  return (     
    <div className={Styles.LoginPage}>
        <div className={Styles.loginPageContent}>
            <Typography  variant='subtitle1' sx={{ 
                color: '#ABD7FF', 
                fontFamily: 'Dela Gothic One', 
                fontSize:'32px'}} 
                gutterBottom>
                SLU SACRED HEART MEDICAL CENTER
            </Typography>
            <Typography sx={{ 
                color: '#ABD7FF', 
                fontFamily: 'Dela Gothic One', 
                fontSize:'150px', 
                marginTop: '-5rem', 
                marginBottom:'-1rem'}} 
                gutterBottom>
                KARDEX
            </Typography>
        </div>
        <div className={Styles.formContent}>
            <form noValidate autoComplete="off">
                <div className={Styles.loginForm}>
                    <TextField 
                        label="Username"
                        variant='filled'
                        margin="dense"
                        required
                        sx={{background: 'white', color: '#203162', borderRadius: 2}}
                        fullWidth
                        onChange={handleOnChangeUser}
                    />
                    <TextField 
                        label="Password"
                        variant='filled'
                        type="password"
                        margin="dense"
                        required
                        sx={{background: 'white', color: '#203162', borderRadius: 2}}
                        fullWidth
                        onChange={handleOnChangePass}
                    />
                </div>
                <div className={Styles.buttonContent}>
                    <Button variant='contained' size='large' color="primary" type="submit" sx={{color: '#203162', background: '#FFC610', borderRadius: 10}} onClick={handleOnSubmit}>
                            login
                    </Button>
                </div>
            </form>
        </div>
        <div className={Styles.loginError}>
            {showError && (
            <Alert severity='error' onClose={() => setShowError(false)} color='warning'>
                <AlertTitle>Invalid Credentials</AlertTitle>
                Username or Password is incorrect.
            </Alert>
        )}
        </div>  
    </div>    
  )
}

export default LoginPage