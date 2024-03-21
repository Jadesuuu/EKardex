'use client'
import { Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import Styles from './page.module.css';


const HomePage = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    router.push('src/app'); 
  };

  return (
    <>
      <div className={Styles.HomePage}>
        <div className={Styles.profile}>
          <IconButton onClick={handleClick} sx={{color: '#ABD7FF', marginLeft:'-40rem', marginTop: '-30rem'}}>
            <AccountCircleIcon fontSize='large' />
            <Typography variant='body1' sx={{color: 'white', paddingLeft: '0.7vw', fontWeight: 'bold'}}>A1 Benner</Typography>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleLogout} sx={{width: '8vw', height: '1.6vh', borderRadius: 10}}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      <div className={Styles.homePageContent}>
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
    </div>
    </>
  )
}

export default HomePage;