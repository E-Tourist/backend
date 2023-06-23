import { IDirectionDTO } from '@interfaces/dto/map-route.interface.dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     IMapRouteRequestDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         distance:
 *           type: integer
 *         travelTimeInMinutes:
 *           type: integer
 *         description:
 *           type: string
 *         direction:
 *           $ref: '#/components/schemas/IDirectionDTO'
 */
export interface IMapRouteRequestDTO {
    name: string;
    distance: number;
    travelTimeInMinutes: number;
    description: string;
    direction: IDirectionDTO;
}