import { UserControllerApi } from "../api/api";

const userController = new UserControllerApi();

async function loadUser(id: number) {
    return userController.getById({ id: id });
}
async function loadAllUsers() {
    return userController.getAllUsers({ credentials: "include" });
}
async function confirmRegistration(token: string) {
    return await userController.confirmRegistration({ token: token }, { credentials: "include" });
}
export { loadUser, loadAllUsers, confirmRegistration };
