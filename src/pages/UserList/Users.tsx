
import { Box, Container } from "@mui/material";
import { UserVM } from "../../api/api";
import UserFullFilter from "../../components/Filters/UserFilter/UserFullFilter";
import { loadAllUsers } from "../../fetchData/fetchUser";
import withLoading from "../../fetchData/withLoading";
import useFilterData from "../../hooks/useFilterData";
import UserItem from "./UserItem";

const NGINX_URL = process.env.REACT_APP_USER;

interface UsersProps {
  users: UserVM[];
}

const Users = (props: UsersProps) => {
  const { users } = props;
  const filter = useFilterData(users);

  return (
    <Container maxWidth="xl">
      <UserFullFilter data={users} {...filter.filterControl} />
      <Box sx={{ minHeight: "100vh" }}>
        {filter.Feedback
          ? filter.Feedback
          : filter.data.map((a: any, idx: any) => (
            <UserItem
              key={idx}
              id={a.id}
              username={a.username}
              shortDescription={a.shortDescription}
              image={`${NGINX_URL}/${a.profilePicturePath}/profile.jpg`}
              role={a.role}
            />
          ))}
      </Box>
    </Container>
  );
};
export default withLoading(Users, { users: loadAllUsers });
