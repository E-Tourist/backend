import { IPlaceResponseDTO } from '@interfaces/dto/responses/places/search-places.interface.schema';

export interface IPlaceService {
    searchPlaces(query: string): Promise<Array<IPlaceResponseDTO>>;
}

