import { IApiUser } from '@interfaces/models/api_user';
import { IApiUserRepositoryInterface } from '@interfaces/repositories/api_user.repository.interface';

export class ApiUserRepository implements IApiUserRepositoryInterface {
    async getUserByUsername(username: string): Promise<IApiUser | undefined> {
        // TODO: get user from DB by some SQL query
        const users = await this.getUsers();

        return users.find(user => {
            return user.username === username;
        });
    }

    async getUsers(): Promise<Array<IApiUser>> {
        // TODO: get users from some DB
        // password ciphered by AES with CRYPT_SECRET_KEY. Check ENV.md documentation how to encrypt and decrypt passwords
        return [
            {
                id: '820af3d7-fa2b-433d-a1b7-d17e59bc2aba',
                username: 'demo',
                password: 'U2FsdGVkX187a66xECJi/9gBDMkHMe6A3uZjQFGQJC8=' // !!! password "demo" encrypted with "demo" secret key, change it before using on production
            }
        ];
    }

    add(user: IApiUser): Promise<void> {
        throw new Error('Method not implemented.');
    }

}