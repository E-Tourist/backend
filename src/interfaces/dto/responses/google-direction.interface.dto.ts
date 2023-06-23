/**
 * @openapi
 * components:
 *  schemas:
 *    IGoogleDirectionResponseDTO:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        routes:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              summary:
 *                type: string
 *              legs:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    steps:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          distance:
 *                            type: object
 *                            properties:
 *                              text:
 *                                type: string
 *                              value:
 *                                type: number
 *                          duration:
 *                            type: object
 *                            properties:
 *                              text:
 *                                type: string
 *                              value:
 *                                type: number
 *                          end_location:
 *                            type: object
 *                            properties:
 *                              lat:
 *                                type: number
 *                              lng:
 *                                type: number
 *                          start_location:
 *                            type: object
 *                            properties:
 *                              lat:
 *                                type: number
 *                              lng:
 *                                type: number
 *                          html_instructions:
 *                            type: string
 *                          travel_mode:
 *                            type: string
 */
export interface IGoogleDirectionResponseDTO {
    status: string;
    routes: Array<Route>;
}

interface Route {
    summary: string;
    legs: Array<Leg>;
}

interface Leg {
    steps: Array<Step>;
}

interface Step {
    distance: TextValue;
    duration: TextValue;
    end_location: LatLong;
    start_location: LatLong;
    html_instructions: string;
    travel_mode: string;
}

interface TextValue {
    text: string;
    value: number;
}

interface LatLong {
    lat: number;
    lng: number;
}