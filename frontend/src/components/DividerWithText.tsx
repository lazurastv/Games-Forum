import React, { FC } from "react";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

interface Props {
}

const DividerWithText: FC<Props> = ({ children, ...props }) => (
  <Grid container alignItems="center" spacing={3} {...props} sx={{color: 'text.secondary'}}>
    <Grid item xs>
      <Divider />
    </Grid>
    <Grid item>{children}</Grid>
    <Grid item xs>
      <Divider />
    </Grid>
  </Grid>
);

export default DividerWithText;