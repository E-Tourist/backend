import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';

/**
 * @openapi
 * components:
 *   schemas:
 *     ICommentShortResponseDTO:
 *       type: object
 *       properties:
 *         author:
 *           $ref: '#/components/schemas/IUserShortResponseDTO'
 *         content:
 *           type: string
 *         createdDateTime:
 *           type: string
 */
export interface ICommentShortResponseDTO {
    author: IUserShortResponseDTO;
    content: string;
    createdDateTime: Date;
}