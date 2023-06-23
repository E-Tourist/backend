/**
 * @openapi
 * components:
 *   schemas:
 *     IGooglePlaceResponseDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         geometry:
 *           type: object
 *           properties:
 *             location:
 *               type: object
 *               properties:
 *                 lat:
 *                   type: number
 *                 lng:
 *                   type: number
 *             viewport:
 *               type: object
 *               properties:
 *                 northeast:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                     lng:
 *                       type: number
 *                 southwest:
 *                   type: object
 *                   properties:
 *                     lat:
 *                       type: number
 *                     lng:
 *                       type: number
 *         rating:
 *           type: number
 *           nullable: true
 *         formatted_address:
 *           type: string
 *           nullable: true
 */
export interface IGooglePlaceResponseDTO {
    name: string;
    geometry: {
        location: {
            lat: number,
            lng: number
        },
        viewport: {
                northeast: {
                        lat: number, lng: number
                },
                southwest: {
                    lat: number, lng: number
                },
            },
    };
    rating?: number | null;
    formatted_address?: string | null;
}
