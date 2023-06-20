import { IPlaceController } from '@interfaces/controllers/api/place.interface.controller';
import { IPlaceService } from '@interfaces/services/place-interface-service';
import { APIRouter, AuthType } from '@interfaces/controllers/api.interface';
import { IPlaceResponseDTO } from '@interfaces/dto/responses/places/search-places.interface.schema';
import { Request, Response } from 'express';
import { InvalidQueryParameterError } from '@common/errors/invalid-query-parameter-error';


export class PlaceController extends APIRouter implements IPlaceController {
    authType = AuthType.KEYCLOAK_TOKEN;

    constructor(private placeService: IPlaceService) {
        super('/places');
    }

    initializeRoutes(): void {
        this.createRoute('get', this.path, this.searchPlaces.bind(this));
    }

    async searchPlaces(req: Request<{ query: string }>, res: Response<Array<IPlaceResponseDTO>>): Promise<Response<Array<IPlaceResponseDTO>>> {
        const query = req.query.query;
        if (typeof query !== 'string') {
            throw new InvalidQueryParameterError();
        }
        const places = await this.placeService.searchPlaces(query);
        return res.json(places);
    }
}
