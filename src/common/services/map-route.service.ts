import { IMapRouteRequestDTO } from '@interfaces/dto/requests/map-route.interface.dto';
import { IMapRouteRepository } from '@interfaces/repositories/map-route.repository.interface';
import { MapRouteMapper } from '@common/mappers/map-route.mapper';
import { IMapRouteService } from '@interfaces/services/map-route.interface.service';
import { MapRouteRepository } from '@common/repositories/map-route.repository';
import { IMapRouteShortResponseDTO } from '@interfaces/dto/responses/map-route-short.interface.dto';
import { ICommentShortResponseDTO } from '@interfaces/dto/responses/comment-interface.dto';
import { IUserRepository } from '@interfaces/repositories/user.repository.interface';
import { UserRepository } from '@common/repositories/user.repository';
import { IMapRouteResponseDTO } from '@interfaces/dto/responses/map-route.interface.dto';

export class MapRouteService implements IMapRouteService {

    private mapRouteRepository: IMapRouteRepository;
    private userRepository: IUserRepository;

    constructor() {
        this.mapRouteRepository = new MapRouteRepository();
        this.userRepository = new UserRepository();
    }

    async createMapRoute(mapRouteRequestDTO: IMapRouteRequestDTO): Promise<string> {
        const mapRoute = MapRouteMapper.toMapRoute(mapRouteRequestDTO);
        const user = await this.userRepository.getUserByExternalId('anonymous');

        if (user) {
            mapRoute.author = user;
            const createdMapRoute = await this.mapRouteRepository.createMapRoute(mapRoute);
            return createdMapRoute._id.toString();
        } else {
            throw new Error('Anonymous user not found');
        }
    }

    async getAllMapRoutes(): Promise<Array<IMapRouteShortResponseDTO>> {
        const mapRoutes = await this.mapRouteRepository.getAllMapRoutes();
        return mapRoutes.map(mapRoute => MapRouteMapper.toIMapRouteShortResponseDTO(mapRoute));
    }

    async getAllDetailedMapRoutes(): Promise<Array<IMapRouteResponseDTO>> {
        const mapRoutes = await this.mapRouteRepository.getAllMapRoutes();
        return mapRoutes.map(mapRoute => MapRouteMapper.toIMapRouteResponseDTO(mapRoute));
    }

    async getMapRouteDetailsById(routeId: string): Promise<IMapRouteResponseDTO> {
        const mapRoute = await this.mapRouteRepository.getMapRouteDetailsById(routeId);

        if (!mapRoute) {
            throw new Error(`MapRoute not found with id: ${routeId}`);
        }

        return MapRouteMapper.toIMapRouteResponseDTO(mapRoute);
    }

    async getMapRouteCommentsById(routeId: string): Promise<Array<ICommentShortResponseDTO>> {
        return this.mapRouteRepository.getMapRouteCommentsById(routeId);
    }
}
