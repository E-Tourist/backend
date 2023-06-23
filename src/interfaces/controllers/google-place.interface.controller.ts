import { Request, Response } from 'express';
import { IQueryParameterRequestDTO } from '@interfaces/dto/requests/parameters/query.interface.dto';
import { IGooglePlaceResponseDTO } from '@interfaces/dto/responses/google-place.interface.dto';

/**
 * @openapi
 * tags:
 *  - name: places
 *    description: The places type API
 */
export interface IGooglePlaceController {
    /**
     * @openapi
     *  /places:
     *      get:
     *          operationId: searchPlaces
     *          summary: Search places in Google Places API
     *          description: This operation searches places in Google Places API
     *          security:
     *              - bearer-token: []
     *          tags:
     *              - places
     *          parameters:
     *              - $ref: '#/components/parameters/query'
     *          responses:
     *              '200':
     *                  description: Successful operation
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: array
     *                              items:
     *                                  $ref: '#/components/schemas/IGooglePlaceResponseDTO'
     *              '400':
     *                  $ref: '#/components/responses/BadRequest'
     *              '500':
     *                  $ref: '#/components/responses/InternalServerError'
     */
    searchPlaces(req: Request<IQueryParameterRequestDTO>, res: Response<Array<IGooglePlaceResponseDTO>>): Promise<Response<Array<IGooglePlaceResponseDTO>>>;
}