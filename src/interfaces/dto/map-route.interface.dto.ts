/**
 * @openapi
 * components:
 *   schemas:
 *     ILocationDTO:
 *       type: object
 *       properties:
 *         lat:
 *           type: number
 *           format: double
 *         lng:
 *           type: number
 *           format: double
 *     IBoundsDTO:
 *       type: object
 *       properties:
 *         northeast:
 *           $ref: '#/components/schemas/ILocationDTO'
 *         southwest:
 *           $ref: '#/components/schemas/ILocationDTO'
 *     IDistanceAndDurationDTO:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *         value:
 *           type: integer
 *     IPolylineDTO:
 *       type: object
 *       properties:
 *         points:
 *           type: string
 *     IStepDTO:
 *       type: object
 *       properties:
 *         distance:
 *           $ref: '#/components/schemas/IDistanceAndDurationDTO'
 *         duration:
 *           $ref: '#/components/schemas/IDistanceAndDurationDTO'
 *         end_location:
 *           $ref: '#/components/schemas/ILocationDTO'
 *         html_instructions:
 *           type: string
 *         polyline:
 *           $ref: '#/components/schemas/IPolylineDTO'
 *         start_location:
 *           $ref: '#/components/schemas/ILocationDTO'
 *         travel_mode:
 *           type: string
 *         maneuver:
 *           type: string
 *     ILegDTO:
 *       type: object
 *       properties:
 *         distance:
 *           $ref: '#/components/schemas/IDistanceAndDurationDTO'
 *         duration:
 *           $ref: '#/components/schemas/IDistanceAndDurationDTO'
 *         end_address:
 *           type: string
 *         end_location:
 *           $ref: '#/components/schemas/ILocationDTO'
 *         start_address:
 *           type: string
 *         start_location:
 *           $ref: '#/components/schemas/ILocationDTO'
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IStepDTO'
 *         traffic_speed_entry:
 *           type: array
 *           items:
 *             type: any
 *         via_waypoint:
 *           type: array
 *           items:
 *             type: any
 *     IRouteDTO:
 *       type: object
 *       properties:
 *         bounds:
 *           $ref: '#/components/schemas/IBoundsDTO'
 *         copyrights:
 *           type: string
 *         legs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ILegDTO'
 *         overview_polyline:
 *           $ref: '#/components/schemas/IPolylineDTO'
 *         summary:
 *           type: string
 *         warnings:
 *           type: array
 *           items:
 *             type: string
 *         waypoint_order:
 *           type: array
 *           items:
 *             type: integer
 *     IDirectionDTO:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         routes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IRouteDTO'
 */
export interface IDirectionDTO {
    status: string;
    routes: Array<IRouteDTO>;
}

export interface IRouteDTO {
    bounds: IBoundsDTO;
    copyrights: string;
    legs: Array<ILegDTO>;
    overview_polyline: IPolylineDTO;
    summary: string;
    warnings: Array<string>;
    waypoint_order: Array<number>;
}

export interface ILegDTO {
    distance: IDistanceAndDurationDTO;
    duration: IDistanceAndDurationDTO;
    end_address: string;
    end_location: ILocationDTO;
    start_address: string;
    start_location: ILocationDTO;
    steps: Array<IStepDTO>;
    traffic_speed_entry: Array<any>;
    via_waypoint: Array<any>;
}

export interface IBoundsDTO {
    northeast: ILocationDTO;
    southwest: ILocationDTO;
}

export interface IPolylineDTO {
    points: string;
}

export interface ILocationDTO {
    lat: number;
    lng: number;
}

export interface IDistanceAndDurationDTO {
    text: string;
    value: number;
}

export interface IStepDTO {
    distance: IDistanceAndDurationDTO;
    duration: IDistanceAndDurationDTO;
    end_location: ILocationDTO;
    html_instructions: string;
    polyline: IPolylineDTO;
    start_location: ILocationDTO;
    travel_mode: string;
    maneuver?: string;
}