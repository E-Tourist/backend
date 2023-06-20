import { IUserResponseDTO } from '@interfaces/dto/responses/user.interface.schema';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.schema';
import { IUserService } from '@interfaces/services/user.interface.service';
import { UserRepository } from '@common/repositories/user.repository';
import { UserMapper } from '@common/mapper/user-to-userdto.mapper';

export class UserService implements IUserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(userRequestDTO: IUserRequestDTO): Promise<IUserResponseDTO> {
        const user = UserMapper.toUser(userRequestDTO);
        const createdUser = await this.userRepository.createUser(user);

        return UserMapper.toResponseDTO(createdUser);
    }
}
