/**
 * @openapi
 * components:
 *   schemas:
 *     IAuthorizationSuccessDTO:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         expires:
 *           type: string
 *           format: date-time
 *         user:
 *           type: string
 */
export interface IAuthorizationSuccessDTO {
    token: string;
    expires: string;
    user: string;
}
