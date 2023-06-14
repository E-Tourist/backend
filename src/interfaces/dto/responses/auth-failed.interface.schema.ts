
/**
 * components:
 *  schemas:
 *      InvalidCredentials:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              example: Invalid credentials
 *            errors:
 *              type: object
 */
 export interface IInvalidCredentialsDTO {
    message: string;
    errors: unknown;
}