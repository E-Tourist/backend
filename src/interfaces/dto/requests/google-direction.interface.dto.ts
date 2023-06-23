/**
 * @openapi
 * components:
 *  parameters:
 *    origin:
 *      name: origin
 *      in: query
 *      description: The address/coordinates from which to calculate directions.
 *      required: true
 *      schema:
 *        type: string
 *    destination:
 *      name: destination
 *      in: query
 *      description: The address/coordinates to which to calculate directions.
 *      required: true
 *      schema:
 *        type: string
 *    mode:
 *      name: mode
 *      in: query
 *      description: The travel mode to use for calculation. Can be driving, walking, bicycling or transit.
 *      schema:
 *        type: string
 *        enum: [driving, walking, bicycling, transit]
 *        default: driving
 *    units:
 *      name: units
 *      in: query
 *      description: The unit system to use in the response text and distance fields. Can be metric or imperial.
 *      schema:
 *        type: string
 *        enum: [metric, imperial]
 *        default: metric
 */
export interface IGoogleDirectionRequestDTO {
    origin: string;
    destination: string;
    mode?: string;
    units?: string;
}
