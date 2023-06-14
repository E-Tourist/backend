import { ApiUserRepository as DBApiUsersRepository } from '@common/repositories/api_users/db_api_users.repository';
import { IApiUser } from '@interfaces/models/api_user';
import { IApiUserRepositoryInterface } from '@interfaces/repositories/api_user.repository.interface';
import { IApiUsersService } from '@interfaces/auth/api-users-service.interface';

export class ApiUsersService implements IApiUsersService {
    constructor(
        protected dbApiUsersRepository: IApiUserRepositoryInterface = new DBApiUsersRepository(),
    ) { }

    async getUsers(): Promise<Array<IApiUser>> {
        const repository = this.getRepository();
        return repository.getUsers();
    }

    async getUserByUsername(username: string): Promise<IApiUser | undefined> {
        const repository = this.getRepository();
        return repository.getUserByUsername(username);
    }

    protected getRepository(): IApiUserRepositoryInterface {
        return this.dbApiUsersRepository;
    }
}