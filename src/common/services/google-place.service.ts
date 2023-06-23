import { IGooglePlaceService } from '@interfaces/services/google-place.interface.service';
import { IGooglePlaceResponseDTO } from '@interfaces/dto/responses/google-place.interface.dto';
import axios, { AxiosResponse } from 'axios';
import pino from 'pino';

const logger = pino();

export class GooglePlaceService implements IGooglePlaceService {
    private apiUrl: string = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

    async searchPlaces(query: string): Promise<Array<IGooglePlaceResponseDTO>> {
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

            return response.data.results.map((result: any): IGooglePlaceResponseDTO => ({
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
