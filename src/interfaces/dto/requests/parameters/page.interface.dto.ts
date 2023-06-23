/**
 * @openapi
 *  components:
 *      parameters:
 *          page:
 *              name: page
 *              in: query
 *              required: false
 *              schema:
 *                  type: integer
 *                  format: int32
 *                  default: 0
 *              example: 0
 *              description: Requested page to be provided in response. Default value 0
 */
export interface IPageParameterRequestDTO {
    page?: number;
}