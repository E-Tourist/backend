import { IMapRoute } from '@interfaces/models/map-route.interface';
import { IMapRouteRepository } from '@interfaces/repositories/map-route.repository.interface';
import { MapRouteModel } from '@common/models/map-route';
import { CommentModel } from '@common/models/comment';
import { ICommentShortResponseDTO } from '@interfaces/dto/responses/comment-interface.dto';
import { IUser } from '@interfaces/models/user.interface';

export class MapRouteRepository implements IMapRouteRepository {

    async createMapRoute(mapRoute: IMapRoute): Promise<IMapRoute> {
        const mapRouteModel = new MapRouteModel(mapRoute);
        return await mapRouteModel.save();
    }

    async getAllMapRoutes(): Promise<Array<IMapRoute>> {
        return MapRouteModel.find({});
    }

    async getMapRouteDetailsById(mapRouteId: string): Promise<IMapRoute> {
        const mapRoute = await MapRouteModel.findById(mapRouteId).exec();
        if (!mapRoute) {
            throw new Error(`MapRoute not found with id: ${mapRouteId}`);
        }
        return mapRoute;
    }

    async getMapRouteCommentsById(mapRouteId: string): Promise<Array<ICommentShortResponseDTO>> {
        const comments = await CommentModel.find({ route: mapRouteId }).populate('author', 'firstName lastName');
        return comments.map(comment => ({
            author: {
                username: (comment.author as IUser).username,
                firstName: (comment.author as IUser).firstName,
                lastName: (comment.author as IUser).lastName
            },
            content: comment.content,
            createdDateTime: comment.createdDateTime
        }));
    }
}