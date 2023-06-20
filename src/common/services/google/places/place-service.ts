import { IPlaceService } from '@interfaces/services/place.interface.service';
import axios, { AxiosResponse } from 'axios';
import pino from 'pino';
import { IPlaceResponseDTO } from '@interfaces/dto/responses/places/search-places.interface.schema';

const logger = pino();

export class GooglePlaceService implements IPlaceService {
    private apiUrl: string = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

    async searchPlaces(query: string): Promise<Array<IPlaceResponseDTO>> {
        try {
            const response: AxiosResponse = await axios.get(this.apiUrl, {
                params: {
                    query,
                    fields: 'name,geometry,rating,formatted_address',
                    key: process.env.GOOGLE_MAPS_API_KEY
                },
                timeout: 1000
            });

            if (response.data.status !== 'OK') {
                throw new Error(`Error occurred during place search: ${response.data.status}`);
            }

            return response.data.results.map((result: any): IPlaceResponseDTO => ({
                name: result.name,
                geometry: result.geometry,
                rating: result.rating,
                formatted_address: result.formatted_address
            }));
        } catch (err) {
            logger.error(err);
            return [];
        }
    }
}
