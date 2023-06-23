/**
 * @openapi
 * components:
 *   schemas:
 *     IUserUpdateRequestDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *           nullable: true
 *         avatarUrl:
 *           type: string
 *           nullable: true
 *         bio:
 *           type: string
 *           nullable: true
 */
export interface IUserUpdateRequestDTO {
    email?: string;
    username?: string;
    avatarUrl?: string;
    bio?: string;
    hasNewsletterSubscription?: boolean;
}