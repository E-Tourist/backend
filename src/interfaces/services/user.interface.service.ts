import { IUserResponseDTO } from '@interfaces/dto/responses/user.interface.schema';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.schema';

export interface IUserService {
    createUser(user: IUserRequestDTO): Promise<IUserResponseDTO>;
}
