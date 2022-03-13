import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CollapseButton from "../../components/CollapseButton";
const Label = (props: any) => (
  <Typography
    component="span"
    sx={{
      color: "text.secondary",
      fontWeight: "300",
      minWidth: "95px",
      mr: 1,
      ...props.sx,
    }}
  >
    {props.children}
  </Typography>
);
const Requirement = (props: any) => (
  <Typography
    sx={{
      display: "flex",
      fontSize: "18px",
      textAlign: "left",
      mt: 1,
    }}
  >
    <Label>{props.label}</Label>
    <Typography component="span">{props.children}</Typography>
  </Typography>
);
const InfoIcon = (props: any) => (
  <Box
    sx={{
      display: "inline-block",
      mr: 2,
      mt: 2,
      p:0.75,
      pb:0,
      width: "fit-conent",
      backgroundColor: "primary.main",
      border: "1px solid",
      borderColor: "primary.light",
    }}
  >
    <Box
      sx={{
        height: "64px",
        width: "64px",
        mx:"auto",
        mb:0.75
      }}
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
        src={props.src}
        alt={props.src}
      />
    </Box>
    <Typography
      gutterBottom
      sx={{ fontSize: "14px", textAlign: "center", textTransform: "uppercase", color: "text.primary" }}
    >
      {props.children}
    </Typography>
  </Box>
);
export default function CollapsedInfo(props: any) {
  return (
    <Box sx={{ mb: 4 }}>
      <CollapseButton name="Platformy">
        <InfoIcon src="/images/CollapsedInfoIcons/Platforms/pc.jpg">PC</InfoIcon>
        <InfoIcon src="/images/CollapsedInfoIcons/Platforms/xbox360.jpg">XBOX 360</InfoIcon>
        <InfoIcon src="/images/CollapsedInfoIcons/Platforms/ps4.jpg">PS4</InfoIcon>
        <InfoIcon src="/images/CollapsedInfoIcons/Platforms/xboxone.jpg">XBOX ONE</InfoIcon>
        <InfoIcon src="/images/CollapsedInfoIcons/Platforms/switch.jpg">Switch</InfoIcon>
      </CollapseButton>
      <CollapseButton name="Dystrybucje">
        <InfoIcon src="/images/CollapsedInfoIcons/Distributions/steam.jpg">Steam</InfoIcon>
        <InfoIcon src="/images/CollapsedInfoIcons/Distributions/epicgames.jpg">Epic Games</InfoIcon>
        <InfoIcon src="/images/CollapsedInfoIcons/Distributions/origin.jpg">Origin</InfoIcon>
        <InfoIcon src="/images/CollapsedInfoIcons/Distributions/uplay.jpg">Uplay</InfoIcon>
      </CollapseButton>
      <CollapseButton name="Wymagania">
        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography>
              <Label sx={{ color: "text.primary", fontWeight: "400" }}>MINIMALNE:</Label>
              <Requirement label="System:"> Windows® 7</Requirement>
              <Requirement label="Procesor:">Intel Core i3-9100 / AMD Ryzen 3 2300X</Requirement>
              <Requirement label="Pamięć:">8 GB RAM</Requirement>
              <Requirement
                label={
                  <>
                    Karta
                    <br />
                    graficzna:
                  </>
                }
              >
                NVIDIA® GeForce® GTX 1050 Ti / AMD Radeon™ RX 560 (4GB VRAM) NVIDIA® GeForce® GTX 1050
              </Requirement>
              <Requirement
                label={
                  <>
                    Miejsce na <br />
                    dysku:
                  </>
                }
              >
                60 GB dostępnej przestrzeni
              </Requirement>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              <Label sx={{ color: "text.primary", fontWeight: "400" }}>ZALECANE:</Label>
              <Requirement label="System:"> Windows® 7</Requirement>
              <Requirement label="Procesor:">Intel Core i3-9100 / AMD Ryzen 3 2300X</Requirement>
              <Requirement label="Pamięć:">8 GB RAM</Requirement>
              <Requirement
                label={
                  <>
                    Karta
                    <br />
                    graficzna:
                  </>
                }
              >
                NVIDIA® GeForce® GTX 1050 Ti / AMD Radeon™ RX 560 (4GB VRAM)
              </Requirement>
              <Requirement
                label={
                  <>
                    Miejsce na <br />
                    dysku:
                  </>
                }
              >
                60 GB dostępnej przestrzeni
              </Requirement>
            </Typography>
          </Grid>
        </Grid>
      </CollapseButton>
    </Box>
  );
}
