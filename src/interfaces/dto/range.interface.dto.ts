/**
 * @openapi
 * components:
 *  schemas:
 *      IRangeDTO:
 *         required:
 *           - from
 *           - to
 *         type: object
 *         properties:
 *           from:
 *             type: number
 *           to:
 *             type: number
 *         description: Value of dictionary position for type eq RANGE
 */
export interface IRangeDTO {
    from: number;
    to: number;
}