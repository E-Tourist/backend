import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     IRateShortResponseDTO:
 *       type: object
 *       properties:
 *         value:
 *           type: number
 *         user:
 *           type: string
 *         createdDateTime:
 *           type: string
 */
export interface IRateShortResponseDTO {
    value: number;
    user: IUserShortResponseDTO;
    createdDateTime: Date;
}