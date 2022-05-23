import { UserControllerApi } from "../api/api";

const userController = new UserControllerApi();

async function loadUser(id: number) {
    return userController.getById({ id: id });
}
export { loadUser };
