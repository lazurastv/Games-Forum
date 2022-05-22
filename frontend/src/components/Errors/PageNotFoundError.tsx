import { Box } from "@mui/system";
import { ListItemIcon, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import CircleIcon from '@mui/icons-material/Circle';

export default function PageNotFoundError() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        gap: 1,
      }}
    >
      <Stack spacing={2}>
        <Typography sx={{ fontSize: 24 }}>404: Twoja strona jest w innym zamku...</Typography>
        <List>
          <ListItem>
            <ListItemIcon><CircleIcon sx={{ fontSize: 15 }} /></ListItemIcon>
            Sprawdź czy wszystkie słowa są wpisane poprawnie.
          </ListItem>
          <ListItem>
            <ListItemIcon><CircleIcon sx={{ fontSize: 15 }} /></ListItemIcon>
            Spróbój innych słów kluczowych.
          </ListItem>
          <ListItem>
            <ListItemIcon><CircleIcon sx={{ fontSize: 15 }} /></ListItemIcon>
            Spróbuj bardziej ogólnych słów kluczowych.
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
}