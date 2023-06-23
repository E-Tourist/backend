import { IGooglePlaceController } from '@interfaces/controllers/google-place.interface.controller';
import { IGooglePlaceService } from '@interfaces/services/google-place.interface.service';
import { APIRouter, AuthType } from '@interfaces/controllers/common/api.interface';
import { IGooglePlaceResponseDTO } from '@interfaces/dto/responses/google-place.interface.dto';
import { Request, Response } from 'express';
import { InvalidQueryParameterError } from '@common/errors/invalid-query-parameter-error';


export class GooglePlaceController extends APIRouter implements IGooglePlaceController {
    authType = AuthType.KEYCLOAK_TOKEN;

    constructor(private googlePlaceService: IGooglePlaceService) {
        super('/places');
    }

    initializeRoutes(): void {
        this.createRoute('get', this.path, this.searchPlaces.bind(this));
    }

    async searchPlaces(req: Request<{ query: string }>, res: Response<Array<IGooglePlaceResponseDTO>>): Promise<Response<Array<IGooglePlaceResponseDTO>>> {
        const query = req.query.query;
        if (typeof query !== 'string') {
            throw new InvalidQueryParameterError();
        }
        const places = await this.googlePlaceService.searchPlaces(query);
        return res.json(places);
    }
}
