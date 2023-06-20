/**
 * @openapi
 *  components:
 *      schemas:
 *          TimePeriod:
 *              type: object
 *              properties:
 *                  startDateTime:
 *                      type: string
 *                      format: date-time
 *                  endDateTime:
 *                      type: string
 *                      format: date-time
 */
export interface ITimePeriodDTO {
    startDateTime: string;
    endDateTime: string;
}