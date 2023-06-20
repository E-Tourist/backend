

/**
 * @openapi
 *  components:
 *      schemas:
 *          APIError:
 *              type: object
 *              required:
 *                  - messages
 *                  - status
 *                  - timestamp
 *              properties:
 *                  messages:
 *                      type: [string,array]
 *                      items:
 *                          type: string
 *                  status:
 *                      type: integer
 *                  timestamp:
 *                      type: string
 *                  errorCode:
 *                      type: [integer,string]
 */
export interface IAPIErrorDTO {
    messages: string | Array<string>;
    status: number;
    timestamp: string;
    errorCode?: number | string;
}