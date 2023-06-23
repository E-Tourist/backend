/**
 * @openapi
 * components:
 *   schemas:
 *     IBadRequestResponseDTO:
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
export interface IBadRequestResponseDTO {
    id: string;
    status: number;
    messages: Array<string>;
    timestamp: Date;
}