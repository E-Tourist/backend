/**
 * @openapi
 * components:
 *   schemas:
 *     IUserFriendResponseDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         createdDateTime:
 *           type: string
 *         routesAuthorNumber:
 *           type: number
 *         totalDistanceTraveledInKm:
 *           type: number
 *         distanceTraveledInKmLastMonth:
 *           type: number
 *         bio:
 *           type: string
 */
export interface IUserFriendResponseDTO {
    username?: string;
    firstName: string;
    lastName: string;
    createdDateTime: string;
    routesAuthorNumber: number;
    totalDistanceTraveledInKm: number;
    distanceTraveledInKmLastMonth: number;
    bio?: string;
}