import { IUserService } from '@interfaces/services/user.interface.service';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.dto';
import { UserRepository } from '@common/repositories/user.repository';
import { IUserRepository } from '@interfaces/repositories/user.repository.interface';
import { UserMapper } from '@common/mappers/user.mapper';
import { IUserProfileResponseDTO } from '@interfaces/dto/responses/user-profile.interface.dto';
import { IUserUpdateRequestDTO } from '@interfaces/dto/requests/user-update.interface.dto';
import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';

export class UserService implements IUserService {

    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userRequestDTO: IUserRequestDTO): Promise<string> {
        const user = UserMapper.toUser(userRequestDTO);
        const createdUser = await this.userRepository.createUser(user);
        return createdUser._id;
    }

    async getAllUsers(): Promise<Array<IUserShortResponseDTO>> {
        const users = await this.userRepository.getAllUsers();
        return users.map(user => UserMapper.toIUserShortResponseDTO(user));
    }

    async getUser(externalId: string): Promise<IUserProfileResponseDTO> {
        const user = await this.userRepository.getUserByExternalId(externalId);
        if (!user) {
            throw new Error('User not found');
        }
        return UserMapper.toUserProfileResponseDTO(user);
    }

    async updateUser(externalId: string, userUpdateDTO: IUserUpdateRequestDTO): Promise<void> {
        const user = await this.userRepository.getUserByExternalId(externalId);
        if (!user) {
            throw new Error('User not found');
        }

        if (userUpdateDTO.email !== undefined) {
            user.email = userUpdateDTO.email;
        }
        if (userUpdateDTO.username !== undefined) {
            user.username = userUpdateDTO.username;
        }
        if (userUpdateDTO.avatarUrl !== undefined) {
            user.avatarUrl = userUpdateDTO.avatarUrl;
        }
        if (userUpdateDTO.bio !== undefined) {
            user.bio = userUpdateDTO.bio;
        }
        if (userUpdateDTO.hasNewsletterSubscription !== undefined) {
            user.hasNewsletterSubscription = userUpdateDTO.hasNewsletterSubscription;
        }

        await this.userRepository.updateUser(user);
    }
}

