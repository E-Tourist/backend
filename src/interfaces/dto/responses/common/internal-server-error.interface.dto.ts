/**
 * @openapi
 * components:
 *   schemas:
 *     IInternalServerErrorDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         status:
 *           type: integer
 *           format: int32
 *         messages:
 *           type: array
 *           items:
 *             type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 */
export interface IInternalServerErrorDTO {
    id: string;
    status: number;
    messages: Array<string>;
    timestamp: Date;
}