import { IUser } from '@interfaces/models/user.interface';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.dto';
import { UserModel } from '@common/models/user';
import { IUserProfileResponseDTO } from '@interfaces/dto/responses/user-profile.interface.dto';
import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';

export class UserMapper {
    static toUser(userDTO: IUserRequestDTO): IUser {
        return new UserModel({
            ...userDTO,
        });
    }

    static toUserProfileResponseDTO(user: IUser): IUserProfileResponseDTO {
        return {
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            hasNewsletterSubscription: user.hasNewsletterSubscription,
            createdDateTime: user.createdDateTime.toISOString(),
            totalDistanceTraveledInKm: user.totalDistanceTraveledInKm,
            distanceTraveledInKmLastMonth: 0, // TODO: implement this later
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            friends: user.friends,
            routes: user.routes
        };
    }

    static toIUserShortResponseDTO(user: IUser): IUserShortResponseDTO {
        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
}
