import { Request, Response } from 'express';
import { IGoogleDirectionResponseDTO } from '@interfaces/dto/responses/google/get-direction.interface.schema';

/**
 * @openapi
 * tags:
 *   - name: directions
 *     description: The directions type API
 */
export interface IGoogleDirectionController {
    /**
     * @openapi
     *  /directions:
     *      get:
     *          operationId: getDirections
     *          summary: Get directions from origin to destination from Google Directions API
     *          description: This operation retrieves directions from the origin to the destination from Google Directions API
     *          security:
     *              - bearer-token: []
     *          tags:
     *              - directions
     *          parameters:
     *              - $ref: '#/components/parameters/origin'
     *              - $ref: '#/components/parameters/destination'
     *              - $ref: '#/components/parameters/mode'
     *              - $ref: '#/components/parameters/units'
     *          responses:
     *              '200':
     *                  description: Successful operation
     *                  content:
     *                      application/json:
     *                          schema:
     *                              $ref: '#/components/schemas/IGoogleDirectionResponseDTO'
     *              '400':
     *                  $ref: '#/components/responses/BadRequest'
     *              '500':
     *                  $ref: '#/components/responses/InternalServerError'
     */
    getDirections(req: Request, res: Response): Promise<Response<IGoogleDirectionResponseDTO>>;
}
