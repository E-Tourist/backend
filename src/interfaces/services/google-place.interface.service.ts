import { IGooglePlaceResponseDTO } from '@interfaces/dto/responses/google-place.interface.dto';

export interface IGooglePlaceService {
    searchPlaces(query: string): Promise<Array<IGooglePlaceResponseDTO>>;
}

