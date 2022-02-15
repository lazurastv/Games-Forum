import * as React from 'react';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { ColorModeContext } from './App';


export default function ThemeSwitch() {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Switch icon={<NightsStayIcon fontSize="small" color="secondary"/>} 
            checkedIcon={<LightModeIcon fontSize="small" color="secondary"/>}
            color="secondary"
            onChange={colorMode.toggleColorMode}/>
  );
}