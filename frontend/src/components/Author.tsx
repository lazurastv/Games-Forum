import { Avatar, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Widget from "./Widget";
const NGINX_URL = process.env.REACT_APP_NGINX_USER;
interface AuthorProps {
  authorData: any;
  sx?: any;
}
export default function Author({ authorData, sx }: AuthorProps) {
  return (
    <Link to={`/profil/${authorData.id}`}>
      <Widget sx={{ ...sx, mb: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar
            alt={authorData.name}
            src={`${NGINX_URL}/${authorData.profilePicturePath}/profile.jpg`}
            sx={{ mr: 1 }}
          />
          <Typography sx={{ fontSize: "18px", textAlign: "left" }}>{authorData.name}</Typography>
        </Box>
        <Divider sx={{ borderColor: "primary.main" }} />
        <Typography
          sx={{
            fontSize: "16px",
            textAlign: "left",
            mt: 2,
          }}
        >
          {authorData.shortDescription}
        </Typography>
      </Widget>
    </Link>
  );
}
