import { UserControllerApi } from "../api/api";

const userController = new UserControllerApi();

async function loadUser(id: number) {
    return userController.getById({ id: id });
}
async function loadAllUsers() {
    return userController.getAllUsers({ credentials: "include" });
}
export { loadUser, loadAllUsers };
