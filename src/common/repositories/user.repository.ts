import { IUser } from '@interfaces/models/user.interface';
import { IUserRepository } from '@interfaces/repositories/user.repository.interface';
import { UserModel } from '@common/models/user';

export class UserRepository implements IUserRepository {

    async createUser(user: IUser): Promise<IUser> {
        const userModel = new UserModel(user);
        return await userModel.save();
    }

    async getAllUsers(): Promise<Array<IUser>> {
        return UserModel.find({});
    }

    async getUserByExternalId(externalId: string): Promise<IUser | null> {
        return UserModel.findOne({externalId});
    }

    async updateUser(user: IUser): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(user._id, user, { new: true });
    }
}