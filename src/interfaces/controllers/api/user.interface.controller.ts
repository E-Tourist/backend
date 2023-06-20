import { Request, Response } from 'express';
import { IUserResponseDTO } from '@interfaces/dto/responses/user.interface.schema';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.schema';

/**
 * @openapi
 * tags:
 *  - name: users
 *    description: The user API
 */
export interface IUserController {
    /**
     * @openapi
     *  /users:
     *      post:
     *          operationId: createUser
     *          summary: It registers an user
     *          description: This operation registers an user.
     *          security:
     *              - bearer-token: []
     *          tags:
     *              - users
     *          requestBody:
     *              content:
     *                  application/json;charset=utf-8:
     *                      schema:
     *                          $ref: '#/components/schemas/IUserRequestDTO'
     *              required: true
     *          responses:
     *              '201':
     *                   description: OK
     *                   content:
     *                       application/json;charset=utf-8:
     *                          schema:
     *                             $ref: '#/components/schemas/IUserResponseDTO'
     *              '400':
     *                  $ref: '#/components/responses/BadRequest'
     *              '500':
     *                  $ref: '#/components/responses/InternalServerError'
     */
    createUser(req: Request<any, IUserResponseDTO, IUserRequestDTO>, res: Response<IUserResponseDTO>): Promise<Response<IUserResponseDTO>>;
}
