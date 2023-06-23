/**
 * @openapi
 * components:
 *   schemas:
 *     IUserRequestDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *           nullable: true
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         avatarUrl:
 *           type: string
 *           nullable: true
 *         bio:
 *           type: string
 *           nullable: true
 */
export interface IUserRequestDTO {
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    bio?: string;
}
