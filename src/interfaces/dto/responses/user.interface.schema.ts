/**
 * @openapi
 * components:
 *   schemas:
 *     IUserResponseDTO:
 *       type: object
 *       properties:
 *         externalId:
 *           type: string
 *         email:
 *           type: string
 *         username:
 *           type: string
 *           nullable: true
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         bio:
 *           type: string
 *           nullable: true
 *         hasNewsletterSubscription:
 *           type: boolean
 *         createdDateTime:
 *           type: string
 *           format: date-time
 *         totalDistanceTraveled:
 *           type: number
 *           minimum: 0
 *         friends:
 *           type: array
 *           items:
 *             type: string
 */
export interface IUserResponseDTO {
    externalId: string;
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    bio?: string;
    hasNewsletterSubscription: boolean;
    createdDateTime: string;
    totalDistanceTraveled: number;
    friends: Array<string>;
}
