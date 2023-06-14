import { IInvalidCredentialsDTO } from '@interfaces/dto/responses/auth-failed.interface.schema';
import { Request, Response } from 'express';
import { IAuthorizationRequestDTO } from '../../dto/requests/auth-request.interface.schema';
import { IAuthorizationSuccessDTO } from '../../dto/responses/auth-success.interface.schema';

export interface IAuthController {
    /**
     * @param req
     * @param res
     * /auth:
     *  post:
     *      summary: Autoryzacja do API
     *      description: Zwrócony token przychodzi razem z datą wygaśnięcia. Klient powinieny obsłużyć po swojej stronie funkcjonalność zapamiętywania tokena i wygenerowania nowego przed wygaśnięciem.
     *      security: []
     *      parameters: []
     *      tags:
     *          - auth
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: '#/components/schemas/AuthorizationRequest'
     *      responses:
     *          '200':
     *              $ref: '#/components/responses/AuthorizationSuccess'
     *          '400':
     *              $ref: '#/components/responses/BadRequest'
     *          '401':
     *              $ref: '#/components/responses/AuthorizationFailed'
     * components:
     *  responses:
     *      AuthorizationFailed:
     *        description: Błędna autoryzacja
     *        content:
     *          application/json:
     *            schema:
     *              oneOf:
     *                - $ref: '#/components/schemas/InvalidCredentials'
     *      AuthorizationSuccess:
     *        description: Poprawna autoryzacja
     *        content:
     *          application/json:
     *            schema:
     *              oneOf:
     *                  - $ref: '#/components/schemas/AuthorizationSuccess'
     */
    login(req: Request<any, any, IAuthorizationRequestDTO>, res: Response<IAuthorizationSuccessDTO | IInvalidCredentialsDTO>) : Promise<Response<IAuthorizationSuccessDTO | IInvalidCredentialsDTO>>;
}