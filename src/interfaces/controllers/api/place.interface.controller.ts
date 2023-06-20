import { Request, Response } from 'express';
import { ISearchPlacesRequestDTO } from '@interfaces/dto/requests/places/search-places.interface.schema';
import { IPlaceResponseDTO } from '@interfaces/dto/responses/places/search-places.interface.schema';

/**
 * @openapi
 * tags:
 *  - name: places
 *    description: The places type API
 */
export interface IPlaceController {
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
     *                                  $ref: '#/components/schemas/IPlaceResponseDTO'
     *              '400':
     *                  description: Bad request
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  error:
     *                                      type: string
     *              '500':
     *                  description: Internal server error
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  error:
     *                                      type: string
     */
    searchPlaces(req: Request<ISearchPlacesRequestDTO>, res: Response<Array<IPlaceResponseDTO>>): Promise<Response<Array<IPlaceResponseDTO>>>;
}