import { IUser } from '@interfaces/models/user.interface';

export interface IUserRepository {
    createUser(user: IUser): Promise<IUser>;
    getUserByExternalId(externalId: string): Promise<IUser | null>;
    updateUser(user: IUser): Promise<IUser | null>;
    getAllUsers(): Promise<Array<IUser>>;
}
