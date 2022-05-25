import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import MultilineTruncatedText from "../../components/MultilineTruncatedText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useSessionContext } from "../../components/Authentication/SessionContext";
import ProfileBox from "./ProfileBox";
import ProfileDataBox from "./ProfileDataBox";
const NGINX_URL = process.env.REACT_APP_NGINX_USER;

const MyProfile = () => {
  const {
    session: { user },
  } = useSessionContext();
  console.log(user);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md="auto">
          <ProfileBox
            username={user?.username ?? "unknown"}
            role={user?.role ?? "unknown"}
            image={`${NGINX_URL}/${user?.profilePicturePath}/profile.png`}
          />
        </Grid>
        <Grid item xs={12} sm={12} md sx={{ minWidth: 0 }}>
          <ProfileDataBox
            username={user?.username ?? "unknown"}
            email={user?.email ?? "unknown"}
            numberOfComments={user?.commentCount ?? 0}
            description={user?.shortDescription as string}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default MyProfile;
