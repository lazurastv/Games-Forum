import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { loadUser } from "../../fetchData/fetchUser";
import { UserVM } from "../../api/api";
import withLoading from "../../fetchData/withLoading";
import ProfileBox from "./ProfileBox";
import ProfileDataBox from "./ProfileDataBox";

const NGINX_URL = process.env.REACT_APP_NGINX_USER;

const Profile = ({ user }: { user: UserVM }) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={12} md="auto">
          <ProfileBox
            id={user.id!}
            username={user.username!}
            role={user.role!}
            image={`${NGINX_URL}/${user.profilePicturePath}/profile.png`}
            banned={user.banned!}
          />
        </Grid>
        <Grid item xs={12} sm={12} md sx={{ minWidth: 0 }}>
          <ProfileDataBox
            id={user.id!}
            username={user.username!}
            email={user.email!}
            numberOfComments={user.commentCount!}
            description={user.shortDescription!}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const Input = styled("input")({
  display: "none",
});

export default withLoading(Profile, { user: loadUser });
