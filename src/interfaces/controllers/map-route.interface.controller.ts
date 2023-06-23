import { Request, Response } from 'express';
import { IMapRouteRequestDTO } from '@interfaces/dto/requests/map-route.interface.dto';
import { IMapRouteShortResponseDTO } from '@interfaces/dto/responses/map-route-short.interface.dto';
import { ICommentShortResponseDTO } from '@interfaces/dto/responses/comment-interface.dto';
import { IMapRouteResponseDTO } from '@interfaces/dto/responses/map-route.interface.dto';
import { ParamsDictionary } from 'express-serve-static-core';

export interface IMapRouteController {
    /**
     * @openapi
     *  /map-routes:
     *      post:
     *          operationId: createMapRoute
     *          summary: Create a new map route for current logged-in user
     *          description: This operation creates a new map route for current logged-in user
     *          security:
     *              - bearer-token: []
     *          tags:
     *              - routes
     *          requestBody:
     *              required: true
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/IMapRouteRequestDTO'
     *          responses:
     *              '200':
     *                  description: Successful operation
     *              '400':
     *                  description: Bad request
     *              '500':
     *                  description: Internal server error
     */
    createMapRoute(req: Request<any, string, IMapRouteRequestDTO>, res: Response<string>): Promise<Response<string>>;

    /**
     * @openapi
     *  /map-routes:
     *      get:
     *          operationId: getAllMapRoutes
     *          summary: Get all map routes in short
     *          description: This operation retrieves all map routes in short
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
     *                                  $ref: '#/components/schemas/IMapRouteShortResponseDTO'
     *              '500':
     *                  description: Internal server error
     */
    getAllMapRoutes(req: Request, res: Response<Array<IMapRouteShortResponseDTO>>): Promise<Response<Array<IMapRouteShortResponseDTO>>>;


    /**
     * @openapi
     *  /map-routes/detailed:
     *      get:
     *          operationId: getAllDetailedMapRoutes
     *          summary: Get all map routes with detailed information
     *          description: This operation retrieves all map routes with detailed information
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
     *                                  $ref: '#/components/schemas/IMapRouteResponseDTO'
     *              '500':
     *                  description: Internal server error
     */
    getAllDetailedMapRoutes(req: Request, res: Response<Array<IMapRouteResponseDTO>>): Promise<Response<Array<IMapRouteResponseDTO>>>;

    /**
     * @openapi
     *  /map-routes/{id}/detailed:
     *      get:
     *          operationId: getMapRouteDetailsById
     *          summary: Get all details of the specific route map by id
     *          description: This operation retrieves all details of the specific route map by id
     *          security:
     *              - bearer-token: []
     *          parameters:
     *            - name: id
     *              in: path
     *              required: true
     *              schema:
     *                type: string
     *          tags:
     *              - routes
     *          responses:
     *              '200':
     *                  description: Successful operation
     *                  content:
     *                      application/json:
     *                          schema:
     *                              items:
     *                                  $ref: '#/components/schemas/IMapRouteResponseDTO'
     *              '500':
     *                  description: Internal server error
     */
    getMapRouteDetailsById(req: Request<ParamsDictionary>, res: Response<IMapRouteResponseDTO>): Promise<Response<IMapRouteResponseDTO>>;

    /**
     * @openapi
     *  /map-routes/{id}/comments:
     *      get:
     *          operationId: getMapRouteCommentsById
     *          summary: Get comments for a specific map route
     *          description: This operation retrieves comments for a specific map route
     *          security:
     *              - bearer-token: []
     *          tags:
     *              - routes
     *          parameters:
     *              - in: path
     *                name: id
     *                schema:
     *                  type: string
     *                required: true
     *                description: The id of the map route
     *          responses:
     *              '200':
     *                  description: Successful operation
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/ICommentShortResponseDTO'
     *              '404':
     *                  description: Map route not found
     *              '500':
     *                  description: Internal server error
     */
    getMapRouteCommentsById(req: Request, res: Response<Array<ICommentShortResponseDTO>>): Promise<Response<Array<ICommentShortResponseDTO>>>;
}