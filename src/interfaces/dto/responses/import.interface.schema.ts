/**
 * @openapi
 *  components:
 *      schemas:
 *          ImportResponse:
 *              type: object
 *              properties:
 *                   imported:
 *                      type: number
 *                      format: int32
 *                   importFailed:
 *                      $ref: '#/components/schemas/ImportFailedErrorCodes'
 */
export interface ImportResponseDTO {
    imported: number;
    importFailed: Array<ImportFailedError>;
}

/**
 * @openapi
 *  components:
 *      schemas:
 *          ImportFailedErrorCodes:
 *              type: array
 *              items:
 *                 type: object
 *                 properties:
 *                    id:
 *                       type: string
 *                    errorMessage:
 *                       type: string
 *                    errorCode:
 *                       type: number
 *                       description: >-
 *                          Error codes meaning:
 *                             * 0 - Unexpected error
 *                             * 1 - Duplicate key
 *                             * 2 - Validation Error
 */
export type ImportFailedError = {
    id: string;
    errorCode: ImportResponseErrorCodes;
    errorMessage: string;
};

export enum ImportResponseErrorCodes {
    UNEXPECTED_ERROR = 0,
    DUPLICATE_KEY = 1,
    VALIDATION_ERROR = 2
}