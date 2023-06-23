/**
 * components:
 *  schemas:
 *      AuthorizationRequest:
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *        type: object
 */
export interface IAuthorizationRequestDTO {
    username: string;
    password: string;
}