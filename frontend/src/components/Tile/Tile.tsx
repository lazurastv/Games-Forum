import { Box, Typography } from "@mui/material";
const TileText = (props: any) => (
  <Box
    sx={{
      ...props.sx,
      position: "absolute",
      bottom: "15px",
      width: "100%",
      px: "15px",
      zIndex: 10,
    }}
  >
    {props.children}
  </Box>
);
const TileImage = (props: any) => (
  <img
    style={{
      height: "100%",
      width: "100%",
      objectFit: "cover",
      position: "relative",
      zIndex: 1,
    }}
    src={props.src}
    alt={props.src}
  />
);
const TileShadow = (props: any) => (
  <Box
    sx={{
      ...props.sx,
      color: "staticText.primary",
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 2,
        backgroundImage: props.shadow,
      },
    }}
  >
    {props.children}
  </Box>
);
export default function Tile(props: any) {
  return (
    <TileShadow
      shadow="linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent)"
      sx={{
        boxShadow: 3,
        position: "relative",
        borderRadius: "15px",
        overflow: "hidden",
        height: "325px",
        "&:hover": {
          filter: "brightness(120%)",
          cursor: "pointer",
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <TileImage src={props.src} />
      <TileText>
        <Typography
          sx={{
            fontSize: props.small ? "24px" : "36px",
            fontWeight: 500,
            textShadow: `3px 4px 7px rgba(0,0,0,0.4)`,
            textAlign: "left",
            mb: 1,
          }}
        >
          {props.title}
        </Typography>
        <Typography
          component="div"
          sx={{
            color: "staticText.secondary",

            fontSize: props.small ? "14px" : "18px",
            fontWeight: 200,
            width: "100%",
          }}
        >
          {props.caption}
        </Typography>
      </TileText>
      {props.children}
    </TileShadow>
  );
}
export { TileImage, TileText, TileShadow };
