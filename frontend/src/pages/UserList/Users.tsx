import { UserVM } from "../../api/api";
import withLoading from "../../fetchData/withLoading";

const NGINX_URL = process.env.REACT_APP_NGINX_USER;

interface UsersProps {
  users: UserVM[];
}

const Users = () => {//(props: UsersProps) => {
  // const { Users, edit, userName } = props;
  // const filter = useFilterData(Users, userName);
  // const { displayAlert } = useAlert();
  // const handleDeleteUser = (id: number, title: string) => {
  //   deleteUser(id)
  //     .then(() => displayAlert(`Pomyślenie usunięto "${title}" `))
  //     .catch((err) => displayAlert(`Błąd podczas usuwania "${title}" `, true));
  //   if (props.setReload) {
  //     props.setReload((r) => r + 1);
  //   }
  // };
  // // string | undefined as string - czy to jest poprawnie czy dodać undefined do interfejsu, czy te dane mogą być undefined?
  // return (
  //   <Container maxWidth="xl">
  //     <Filter sliderLabel="DATA PUBLIKACJI:" data={Users} {...filter.filterControl} />
  //     <Box sx={{ minHeight: "100vh" }}>
  //       {filter.Feedback
  //         ? filter.Feedback
  //         : filter.data.map((a: any, idx: any) => (
  //           <EditMenuSupply key={idx} edit={edit} onDelete={() => handleDeleteUser(a.id, a.title)}>
  //             <UserItem
  //               UserId={a.id}
  //               content={a.introduction}
  //               date={convertDate(a.publishDate)}
  //               title={a.title as string}
  //               author={a.authorName as string}
  //               image={`${NGINX_URL}/${a.path}/horizontal.png`}
  //             />
  //           </EditMenuSupply>
  //         ))}
  //     </Box>
  //   </Container>
  // );
  return <div>Hi</div>
};
// export default withLoading(Users, { Users: loadAllUsers });
export default Users;
