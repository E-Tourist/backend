/**
 * @openapi
 *  components:
 *      responses:
 *          BadRequest:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              status:
 *                                  type: integer
 *                              messages:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                              timestamp:
 *                                  type: string
 *                                  format: date-time
 */
export interface IBadRequestResponseInterface{
    id: string;
    status: number;
    messages: Array<string>;
    timestamp: Date;
}