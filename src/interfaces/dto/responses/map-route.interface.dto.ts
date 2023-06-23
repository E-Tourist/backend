import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';
import { IDirectionDTO } from '@interfaces/dto/map-route.interface.dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     IMapRouteResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         imageUrls:
 *           type: array
 *           items:
 *             type: string
 *         distance:
 *           type: integer
 *         travelTimeInMinutes:
 *           type: integer
 *         author:
 *           $ref: '#/components/schemas/IUserShortResponseDTO'
 *         isVerified:
 *           type: boolean
 *         description:
 *           type: string
 *         direction:
 *           $ref: '#/components/schemas/IDirectionDTO'
 *         rateMeanValue:
 *           type: integer
 */
export interface IMapRouteResponseDTO {
    id: string;
    name: string;
    imageUrls?: Array<string>;
    distance: number;
    travelTimeInMinutes: number;
    author: IUserShortResponseDTO;
    isVerified: boolean;
    description: string;
    direction: IDirectionDTO;
    rateMeanValue: number;
}