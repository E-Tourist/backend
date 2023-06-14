import { IApiUser } from '@interfaces/models/api_user';


export interface IApiUsersService {

    getUsers(): Promise<Array<IApiUser>>;

    getUserByUsername(username: string): Promise<IApiUser | undefined>;
}