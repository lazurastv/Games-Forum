import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Grid from '@mui/material/Grid';
import ThemeSwitch from "../ThemeSwitch";
import { ColorModeContext } from '../App';
import AccountIconButton from "./AccountIconButton";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSessionContext } from './Authentication/SessionContext';

const Navigation = () => {
  const theme = useTheme();
  const loginBreak = useMediaQuery(theme.breakpoints.up(970));
  const tabPaths = ['/artykuly', '/recenzje', '/gry', '/chat']
  const [sessionContext, updateSessionContext] = useSessionContext();

  let location = useLocation();

  const getValue = () => {
    if( tabPaths.includes(location.pathname)){
      switch (location.pathname) {
        case '/artykuly':
          return 0;
        case '/recenzje':
          return 1;
        case '/gry':
          return 2;
        case '/chat':
          return 3;
      }   
    }
    return false;
  };

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Container maxWidth="xl">    
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs="auto" md="auto" sx={{ mr: 5}} >
                      <span>
                        <Box component={Link} to="/" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, color: "text.primary", textDecoration: "none"}}>
                            <SportsEsportsIcon fontSize="large"/>
                            <Typography
                                variant="h6"
                                noWrap               
                                sx={{ ml: 1 }}>
                                Forum graczy
                            </Typography>
                        </Box>
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={12} md="auto" order={{ xs: 3, sm: 3, md: 2 }}>
                      <Tabs indicatorColor="secondary" 
                            textColor="secondary" 
                            variant="fullWidth"
                            value={getValue()}
                            sx={{ mx: 0}}>
                        <Tab label='Artykuły' to='/artykuly' component={Link} />
                        <Tab label='Recenzje' to='/recenzje' component={Link} />
                        <Tab label='Gry' to='/gry' component={Link} />
                        <Tab label='Chat' to='/chat' component={Link} />
                      </Tabs>
                    </Grid>
                    <Grid item xs container justifyContent="flex-end" order={{ xs: 2, sm: 2, md: 3 }}>
                      <Grid item xs="auto" md="auto">
                          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                            <ThemeSwitch/>
                            {loginBreak ? (
                            sessionContext.isAuthenticated ? (
                              <AccountIconButton/>
                            ) : ( 
                            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                              <Button component={Link} to="logowanie" sx={{color: 'text.primary'}}>Logowanie</Button>
                               <Typography variant="h6" component="div" sx={{mx: 0.5, color:"text.primary"}}>|</Typography>
                              <Button component={Link} to="rejestracja" sx={{color: 'text.primary'}}>Rejestracja</Button>
                            </Box>
                            )
                            ):(
                            <Box sx={{ flexGrow: 1, display: 'flex' }}>
                              <AccountIconButton/>
                            </Box>
                            )}
                          </Box>
                      </Grid>
                    </Grid>
                </Grid>
            </Box>      
      </Container>
    </AppBar>
  );
};
export default Navigation;