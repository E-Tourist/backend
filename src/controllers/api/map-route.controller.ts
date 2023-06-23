import { IMapRouteController } from '@interfaces/controllers/map-route.interface.controller';
import { IMapRouteService } from '@interfaces/services/map-route.interface.service';
import { APIRouter, AuthType } from '@interfaces/controllers/common/api.interface';
import { Request, Response } from 'express';
import { IMapRouteRequestDTO } from '@interfaces/dto/requests/map-route.interface.dto';
import { IMapRouteShortResponseDTO } from '@interfaces/dto/responses/map-route-short.interface.dto';
import { ICommentShortResponseDTO } from '@interfaces/dto/responses/comment-interface.dto';
import { IMapRouteResponseDTO } from '@interfaces/dto/responses/map-route.interface.dto';
import { ParamsDictionary } from 'express-serve-static-core';

export class MapRouteController extends APIRouter implements IMapRouteController {
    authType = AuthType.KEYCLOAK_TOKEN;

    constructor(private mapRouteService: IMapRouteService) {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.createRoute('post', '/map-routes', this.createMapRoute.bind(this));
        this.createRoute('get', '/map-routes', this.getAllMapRoutes.bind(this));
        this.createRoute('get', '/map-routes/detailed', this.getAllDetailedMapRoutes.bind(this));
        this.createRoute('get', '/map-routes/:id/detailed', this.getMapRouteDetailsById.bind(this));
        this.createRoute('get', '/map-routes/:id/comments', this.getMapRouteCommentsById.bind(this));
    }

    async createMapRoute(req: Request<any, string, IMapRouteRequestDTO>, res: Response<string>): Promise<Response<string>> {
        const mapRouteDTO = req.body;
        const mapRouteId = await this.mapRouteService.createMapRoute(mapRouteDTO);
        return res.status(201).send(mapRouteId);
    }

    async getAllMapRoutes(req: Request, res: Response<Array<IMapRouteShortResponseDTO>>): Promise<Response<Array<IMapRouteShortResponseDTO>>> {
        const mapRoutes = await this.mapRouteService.getAllMapRoutes();
        return res.status(200).json(mapRoutes);
    }

    async getAllDetailedMapRoutes(req: Request, res: Response<Array<IMapRouteResponseDTO>>): Promise<Response<Array<IMapRouteResponseDTO>>> {
        const detailedMapRoutes = await this.mapRouteService.getAllDetailedMapRoutes();
        return res.status(200).json(detailedMapRoutes);
    }

    async getMapRouteDetailsById(req: Request<ParamsDictionary>, res: Response<IMapRouteResponseDTO>): Promise<Response<IMapRouteResponseDTO>> {
        const mapRouteId = req.params.id;
        const detailedMapRoute = await this.mapRouteService.getMapRouteDetailsById(mapRouteId);
        return res.status(200).json(detailedMapRoute);
    }

    async getMapRouteCommentsById(req: Request, res: Response<Array<ICommentShortResponseDTO>>): Promise<Response<Array<ICommentShortResponseDTO>>> {
        const mapRouteId = req.params.id;
        const mapRouteComments = await this.mapRouteService.getMapRouteCommentsById(mapRouteId);
        return res.status(200).json(mapRouteComments);
    }
}
