import { IGooglePlaceResponseDTO } from '@interfaces/dto/responses/google/search-places.interface.schema';

export interface IGooglePlaceService {
    searchPlaces(query: string): Promise<Array<IGooglePlaceResponseDTO>>;
}

