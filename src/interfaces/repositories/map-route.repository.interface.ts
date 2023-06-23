import { IMapRoute } from '@interfaces/models/map-route.interface';
import { ICommentShortResponseDTO } from '@interfaces/dto/responses/comment-interface.dto';

export interface IMapRouteRepository {
    createMapRoute(mapRoute: IMapRoute): Promise<IMapRoute>;
    getAllMapRoutes(): Promise<Array<IMapRoute>>;
    getMapRouteDetailsById(mapRouteId: string): Promise<IMapRoute>;
    getMapRouteCommentsById(mapRouteId: string): Promise<Array<ICommentShortResponseDTO>>;
}