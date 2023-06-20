import { IUser } from '@interfaces/models/user.interface';
import { IUserRepository } from '@interfaces/repositories/user.repository.interface';
import { UserModel } from '@common/models/user';

export class UserRepository implements IUserRepository {
    async createUser(user: IUser): Promise<IUser> {
        const userModel = new UserModel(user);
        return await userModel.save();
    }
}