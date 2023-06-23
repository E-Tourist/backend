import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.dto';
import { IUserProfileResponseDTO } from '@interfaces/dto/responses/user-profile.interface.dto';
import { IUserUpdateRequestDTO } from '@interfaces/dto/requests/user-update.interface.dto';
import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';

export interface IUserService {
    createUser(userRequestDTO: IUserRequestDTO): Promise<string>;
    getUser(externalId: string): Promise<IUserProfileResponseDTO>;
    updateUser(externalId: string, userUpdateDTO: IUserUpdateRequestDTO): Promise<void>;
    getAllUsers(): Promise<Array<IUserShortResponseDTO>>;
}
