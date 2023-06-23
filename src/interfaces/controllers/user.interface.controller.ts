import { Request, Response } from 'express';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.dto';
import { IUserProfileResponseDTO } from '@interfaces/dto/responses/user-profile.interface.dto';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserUpdateRequestDTO } from '@interfaces/dto/requests/user-update.interface.dto';
import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';

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
     *                  description: Successful operation
     *                  content:
     *                      text/plain:
     *                          schema:
     *                              type: string
     *                              example: "60f5-fbd6a-e5c441-20db87-0d3"
     *              '400':
     *                  description: Bad request
     *              '500':
     *                  description: Internal server error
     */
    createUser(req: Request<any, string, IUserRequestDTO>, res: Response<string>): Promise<Response<string>>;

    /**
     * @openapi
     *  /users:
     *      get:
     *          operationId: getAllUsers
     *          summary: Get all users
     *          description: This operation retrieves all users
     *          security:
     *              - bearer-token: []
     *          tags:
     *              - routes
     *          responses:
     *              '200':
     *                  description: Successful operation
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/IUserShortResponseDTO'
     *              '500':
     *                  description: Internal server error
     */
    getAllUsers(req: Request, res: Response<Array<IUserShortResponseDTO>>): Promise<Response<Array<IUserShortResponseDTO>>>;

    /**
     * @openapi
     *  /users/{externalId}:
     *    get:
     *      operationId: getUser
     *      summary: Fetch a user's profile
     *      description: Fetches the profile details of a user given their externalId.
     *      security:
     *          - bearer-token: []
     *      parameters:
     *        - name: externalId
     *          in: path
     *          required: true
     *          schema:
     *            type: string
     *      tags:
     *        - users
     *      responses:
     *        '200':
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/IUserProfileResponseDTO'
     *        '404':
     *          description: User not found
     *        '500':
     *          description: Internal Server Error
     */
    getUser(req: Request<ParamsDictionary>, res: Response<IUserProfileResponseDTO>): Promise<Response<IUserProfileResponseDTO>>;

    /**
     * @openapi
     * /users/{externalId}:
     *  put:
     *    operationId: updateUser
     *    summary: Update a user's profile
     *    description: Updates the profile details of a user given their externalId.
     *    security:
     *        - bearer-token: []
     *    parameters:
     *      - name: externalId
     *        in: path
     *        required: true
     *        schema:
     *          type: string
     *    requestBody:
     *      content:
     *        application/json;charset=utf-8:
     *          schema:
     *            $ref: '#/components/schemas/IUserUpdateRequestDTO'
     *      required: true
     *    tags:
     *      - users
     *    responses:
     *      '200':
     *        description: Successful operation
     *      '400':
     *        description: Bad request
     *      '404':
     *        description: User not found
     *      '500':
     *        description: Internal Server Error
     */
    updateUser(req: Request<ParamsDictionary, any, IUserUpdateRequestDTO>, res: Response): Promise<Response>;
}
