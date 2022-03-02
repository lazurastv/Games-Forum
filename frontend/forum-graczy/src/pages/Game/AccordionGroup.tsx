import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionGroup(props: any) {
  return (
    <Box>
      <Accordion sx={{ backgroundColor: "primary.main" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "secondary.main" }} />} >
          <Typography>Platformy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "primary.main"}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "secondary.main" }} />} >
          <Typography>Dystrybucje</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "primary.main" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "secondary.main" }} />} >
          <Typography>Wymagania</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}