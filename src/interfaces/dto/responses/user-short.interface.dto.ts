/**
 * @openapi
 * components:
 *   schemas:
 *     IUserShortResponseDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           nullable: true
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 */
export interface IUserShortResponseDTO {
    username?: string;
    firstName: string;
    lastName: string;
}