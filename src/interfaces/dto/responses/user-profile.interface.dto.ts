import { IUserFriendResponseDTO } from './user-friend.interface.dto';
import { IMapRouteShortResponseDTO } from '@interfaces/dto/responses/map-route-short.interface.dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     IUserProfileResponseDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         avatarUrl:
 *           type: string
 *         bio:
 *           type: string
 *         hasNewsletterSubscription:
 *           type: boolean
 *         createdDateTime:
 *           type: string
 *         totalDistanceTraveledInKm:
 *           type: number
 *         distanceTraveledInKmLastMonth:
 *           type: number
 *         friends:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IUserFriendResponseDTO'
 *         routes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IRouteShortDTO'
 */
export interface IUserProfileResponseDTO {
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    bio?: string;
    hasNewsletterSubscription: boolean;
    createdDateTime: string;
    totalDistanceTraveledInKm: number;
    distanceTraveledInKmLastMonth: number;
    friends?: Array<IUserFriendResponseDTO>;
    routes?: Array<IMapRouteShortResponseDTO>;
}