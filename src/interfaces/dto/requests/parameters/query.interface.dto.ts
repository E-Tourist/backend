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
 *              description: Query string to search
 */
export interface IQueryParameterRequestDTO {
    query: string;
}
