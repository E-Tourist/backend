
/**
 * @openapi
 *  components:
 *      schemas:
 *          Sort:
 *              type: object
 *              required:
 *                  - empty
 *                  - sorted
 *                  - unsorted
 *              properties:
 *                  empty:
 *                      type: boolean
 *                  sorted:
 *                      type: boolean
 *                  unsorted:
 *                      type: boolean
 */
export interface ISearchSortResponseDTO {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

/**
 * @openapi
 *  components:
 *      schemas:
 *          PageableObject:
 *              type: object
 *              required:
 *                  - offset
 *                  - sort
 *                  - pageNumber
 *                  - pageSize
 *                  - paged
 *                  - unpaged
 *              properties:
 *                  offset:
 *                      type: integer
 *                      format: int64
 *                  sort:
 *                      $ref: '#/components/schemas/Sort'
 *                  pageNumber:
 *                      type: integer
 *                      format: int32
 *                  pageSize:
 *                      type: integer
 *                      format: int32
 *                  paged:
 *                      type: boolean
 *                  unpaged:
 *                      type: boolean
 */
export interface ISearchPageableResponseDTO {
    offset: number;
    sort: ISearchSortResponseDTO;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

/**
 * @openapi
 *  components:
 *      schemas:
 *          BaseSearchResponse:
 *              type: object
 *              required:
 *                  - totalPages
 *                  - totalElements
 *                  - size
 *                  - content
 *                  - sort
 *                  - numberOfElements
 *                  - pageable
 *                  - first
 *                  - last
 *                  - empty
 *              properties:
 *                  totalPages:
 *                      type: integer
 *                      format: int32
 *                  totalElements:
 *                      type: integer
 *                      format: int64
 *                  size:
 *                      type: integer
 *                      format: int32
 *                  content:
 *                      type: array
 *                      items:
 *                          type: object
 *                  sort:
 *                      $ref: '#/components/schemas/Sort'
 *                  numberOfElements:
 *                      type: integer
 *                      format: int32
 *                  pageable:
 *                      $ref: '#/components/schemas/PageableObject'
 *                  first:
 *                      type: boolean
 *                  last:
 *                      type: boolean
 *                  empty:
 *                      type: boolean
 */
export interface ISearchResponseDTO<T extends object> {
    totalPages: number;
    totalElements: number;
    size: number;
    sort: ISearchSortResponseDTO;
    content: Array<T>;
    first: boolean;
    last: boolean;
    empty: boolean;
}