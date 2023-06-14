import { IApiUser } from '@interfaces/models/api_user';

export interface IApiUserRepositoryInterface {

    getUserByUsername(username: string): Promise<IApiUser | undefined>;
    getUsers(): Promise<Array<IApiUser>>;

    add(user: IApiUser): Promise<void>;
}