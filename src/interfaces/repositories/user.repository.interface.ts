import { IUser } from '@interfaces/models/user.interface';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
}
