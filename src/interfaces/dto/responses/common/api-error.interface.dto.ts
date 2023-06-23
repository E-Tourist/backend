/**
 * @openapi
 * components:
 *   schemas:
 *     IAPIErrorDTO:
 *       type: object
 *       properties:
 *         messages:
 *           oneOf:
 *             - type: string
 *             - type: array
 *               items:
 *                 type: string
 *         status:
 *           type: integer
 *           format: int32
 *         timestamp:
 *           type: string
 *           format: date-time
 *         errorCode:
 *           oneOf:
 *             - type: number
 *             - type: string
 */
export interface IAPIErrorDTO {
    messages: string | Array<string>;
    status: number;
    timestamp: string;
    errorCode?: number | string;
}