import jwt from "../01-utils/jwt";
import ClientError from "../03-models/client-error";
import { ICredentialsModel } from "../03-models/credentials.model";
import { IUserModel } from "../03-models/user.model";
import usersLogic from "../05-bll/users-logic";


async function register(user: IUserModel): Promise<string> {
    const users = await usersLogic.getAllUsers();

    const userExists = users.find(u => u.username.toLowerCase() === user.username.toLowerCase());
    if (userExists) throw new ClientError(409, "Username already exists");
    
    user.id = users[users.length - 1].id + 1;
    user.role = 1;

    await usersLogic.addUser(user);
    
    delete user.password;

    const token = jwt.getNewToken(user);
    return token;
}

async function login(credentials: ICredentialsModel): Promise<string> {
    const users = await usersLogic.getAllUsers();
    const user = users.find(u => u.username.toLowerCase() === credentials.username.toLowerCase() && u.password === credentials.password);

    if (!user) throw new ClientError(401, "Incorrect username or password");

    delete user.password;
    const token = jwt.getNewToken(user);
    return token;
}

export default {
    register,
    login
};