/**
 * @openapi
 * components:
 *      parameters:
 *          query:
 *              name: query
 *              in: query
 *              required: true
 *              schema:
 *                  type: string
 *              description: Query string to search for places
 */
export interface ISearchPlacesRequestDTO {
    query: string;
}
