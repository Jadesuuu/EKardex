'use client'
import { Typography, Menu, MenuItem, IconButton, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import React, { useState } from 'react';
import Styles from './page.module.css';
import CircularProgress from '@mui/material/CircularProgress';

const menuItemStyles = {
  background: '#FFC610',
  color: '#203162',
  fontWeight: 'bold',
  width: '10vw',
  '&:hover': {
    background: '#DFAA00', 
  },
};


const HomePage = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorWardEl, setAnchorWardEl] = useState<null | HTMLElement>(null);
  const [userDropDown, setUserDropDown] = useState(false);
  const [wardsDropDown, setWardsDropDown] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const open = Boolean(anchorEl);
  const openWard = Boolean(anchorWardEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUserDropDown(!userDropDown);
  };

  const handleWardClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorWardEl(event.currentTarget);
    setWardsDropDown(!wardsDropDown);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUserDropDown(false);
  };

  const handleWardClose = () => {
    setAnchorWardEl(null);
    setWardsDropDown(false)
  };

  const handleLogout = async () => {
    setIsLogoutLoading(true)
    handleClose();
    await router.push('/'); 
    setIsLogoutLoading(false)
  };

  const query = {
    medWard: 'Medical Ward',
    surgWard: 'Surgical Ward',
    pediaWard: 'Pediatrics Ward',
    obWard: 'OB GYN Ward',
    ccuWard: 'CCU-MICU', 
    prdlWard: 'PRDL Ward'
  };

  const setMedicalWard = () => {
    router.push(`/homePage/wardPages?ward=${query.medWard}`);
  };

  const setSurgicalWard = () => {
    router.push(`/homePage/wardPages?ward=${query.surgWard}`);
  };

  const setPediaWard = () => {
    router.push(`/homePage/wardPages?ward=${query.pediaWard}`);
  };

  const setOBGWard = () => {
    router.push(`/homePage/wardPages?ward=${query.obWard}`);
  };

  const setCCUWard = () => {
    router.push(`/homePage/wardPages?ward=${query.ccuWard}`);
  };

  const setPRDLWard = () => {
    router.push(`/homePage/wardPages?ward=${query.prdlWard}`);
  };

  return (
    <>
      <div>
        {isLogoutLoading && <CircularProgress />}
      </div>
      <div className={Styles.HomePage}>
        <div className={Styles.profile}>
          <IconButton onClick={handleClick} sx={{color: '#ABD7FF', marginLeft:'-40rem', marginTop: '-17rem'}}>
            <AccountCircleIcon fontSize='large' />
            <Typography variant='body1' sx={{color: 'white', paddingLeft: '0.7vw', paddingRight: '0.2vw', fontWeight: 'bold'}}>A2 Benner</Typography>
            {userDropDown ? (
              <ArrowDropDownIcon fontSize='small' sx={{color: 'white'}} />
            ): (
              <ArrowDropUpIcon fontSize='small' sx={{color: 'white'}} />
            )}
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{mt: "1px", 
              "& .MuiMenu-paper": {
                backgroundColor: "white", 
                marginTop: 0.5, paddingLeft: '0.5vw'}}}>
            <MenuItem 
            onClick={handleLogout} 
            sx={{
              width: '8vw', 
              height: '1.6vh', 
              borderRadius: 10, 
              fontSize:'20px', 
              justifyContent: 'center', 
              color: '#203162'}}>
              Log out
            </MenuItem>
          </Menu>
        </div>
      <div className={Styles.homePageContent}>
                <Typography  variant='subtitle1' sx={{ 
                  color: '#ABD7FF', 
                  fontFamily: 'Dela Gothic One', 
                  fontSize:'33px',
                  marginLeft:'10px'}} 
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
        <div>
          <Button 
          onClick={handleWardClick} 
          variant='contained' 
          sx={{
            background: '#FFC610', 
            color: '#203162', 
            borderRadius: 10, 
            fontWeight: 'bold', 
            width:'10vw', 
            fontSize:'19px', 
            marginLeft: '23.7vw'}}>
            Wards
            {wardsDropDown ? (
              <ArrowDropDownIcon sx={{color: '#203162', paddingLeft: '10px', fontSize: '38px'}} />
            ): (
              <ArrowDropUpIcon sx={{color: '#203162', paddingLeft: '10px', fontSize: '38px'}} />
            )}
          </Button>
          <div className={Styles.menuWard}>
            <Menu 
              anchorEl={anchorWardEl} 
              open={openWard} 
              onClose={handleWardClose} 
              sx={{mt: "1px", 
              "& .MuiMenu-paper": {
                backgroundColor: "#FFC610", 
                marginTop: 0.5,}}}>
              
              <MenuItem sx={menuItemStyles} onClick={setMedicalWard}>
                    MEDICAL
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={setSurgicalWard}>
                    SURGICAL
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={setPediaWard}>
                    PEDIATRICS
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={setOBGWard}>
                    OB GYN
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={setCCUWard}>
                    CCU-MICU
              </MenuItem>
              <MenuItem sx={menuItemStyles} onClick={setPRDLWard}>
                    PRDL
              </MenuItem>
            </Menu>
          </div>
        </div>
    </div>
    </>
  )
}

export default HomePage;