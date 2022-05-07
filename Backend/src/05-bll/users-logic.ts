import { UserModel, IUserModel } from '../03-models/user.model';

async function getAllUsers(): Promise<IUserModel[]> {
    return await UserModel.find().exec();
}

async function addUser(user: IUserModel): Promise<IUserModel> {
    return await user.save();
}


export default {
    getAllUsers,
    addUser
};
