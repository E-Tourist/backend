
/**
 * @openapi
 *  components:
 *      parameters:
 *          size:
 *              name: size
 *              in: query
 *              required: false
 *              schema:
 *                  type: integer
 *                  format: int32
 *                  default: 50
 *              example: 50
 *              description: Requested number of resources to be provided in response. Default value 50
 */
export interface SizeParameterRequestDTO{
    size?: number;
}