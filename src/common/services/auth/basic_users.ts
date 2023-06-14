import { IApiUsersService } from '@interfaces/auth/api-users-service.interface';
import { IBasicUsers } from '@interfaces/auth/basic-api-users-service.interface';
import { CryptService } from '../crypto/crypt-service';
import { ApiUsersService } from './api_users';


export class BasicUsersService {
    public async getUsers(): Promise<IBasicUsers> {
        // not crypted passwords
        const basicUsers: IBasicUsers = {};
        const apiUsers = await this.apiUsersService.getUsers();
        apiUsers.forEach(user => {
            basicUsers[user.username] = CryptService.decrypt(user.password);
        });
        return basicUsers;
    }

    constructor(
        private apiUsersService: IApiUsersService = new ApiUsersService()
    ) { }
}