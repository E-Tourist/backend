import { IUser } from '@interfaces/models/user.interface';
import { IUserResponseDTO } from '@interfaces/dto/responses/user.interface.schema';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.schema';
import { UserModel } from '@common/models/user';

export class UserMapper {
    static toResponseDTO(user: IUser): IUserResponseDTO {
        return {
            externalId: user.externalId,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            hasNewsletterSubscription: user.hasNewsletterSubscription,
            createdDateTime: user.createdDateTime.toISOString(),
            totalDistanceTraveled: user.totalDistanceTraveled,
            friends: user.friends.map(friend => friend.toString()),
        };
    }

    static toUser(userDTO: IUserRequestDTO): IUser {
        return new UserModel({
            ...userDTO,
            createdDateTime: new Date(userDTO.createdDateTime)
        });
    }
}
