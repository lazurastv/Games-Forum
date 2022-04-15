import { Box } from "@mui/system";

export default function Widget(props: any) {
  return (
    <Box
      sx={{
        ...props.sx,
        backgroundColor: "primary.main",
        borderRadius: "15px",
        width: "100%",
        p: 3
      }}
    >
      {props.children}
    </Box>
  )
}