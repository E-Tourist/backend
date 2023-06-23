/**
 * @openapi
 * components:
 *   schemas:
 *     IMapRouteShortResponseDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         distanceInKm:
 *           type: number
 *         rateMeanValue:
 *           type: number
 *         isVerified:
 *           type: boolean
 */
export interface IMapRouteShortResponseDTO {
    id: string;
    name: string;
    distanceInKm: number;
    rateMeanValue: number;
    isVerified: boolean;
}

