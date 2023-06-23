import { IMapRouteRequestDTO } from '@interfaces/dto/requests/map-route.interface.dto';
import { IMapRouteShortResponseDTO } from '@interfaces/dto/responses/map-route-short.interface.dto';
import { ICommentShortResponseDTO } from '@interfaces/dto/responses/comment-interface.dto';
import { IMapRouteResponseDTO } from '@interfaces/dto/responses/map-route.interface.dto';

export interface IMapRouteService {
    createMapRoute(mapRouteRequestDto: IMapRouteRequestDTO): Promise<string>;
    getAllMapRoutes(): Promise<Array<IMapRouteShortResponseDTO>>;
    getAllDetailedMapRoutes(): Promise<Array<IMapRouteResponseDTO>>;
    getMapRouteDetailsById(routeId: string): Promise<IMapRouteResponseDTO>;
    getMapRouteCommentsById(routeId: string): Promise<Array<ICommentShortResponseDTO>>;
}
