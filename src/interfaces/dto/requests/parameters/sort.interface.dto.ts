/**
 * @openapi
 *  components:
 *      parameters:
 *          sort:
 *              name: sort
 *              in: query
 *              required: false
 *              schema:
 *                  type: string
 *              example: name,desc
 *              description: Comma-separated properties to be provided in response
 */
export interface ISortParameterRequestDTO {
    sort?: string;
}