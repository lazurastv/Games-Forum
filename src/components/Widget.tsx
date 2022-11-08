import { Box } from "@mui/system";

export default function Widget(props: any) {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        borderRadius: "15px",
        width: "100%",
        p: props.noPadding ? 0 : 3,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
