import { IPlaceService } from '@interfaces/services/place-interface-service';
import axios, { AxiosResponse } from 'axios';
import pino from 'pino';
import { IPlaceResponseDTO } from '@interfaces/dto/responses/places/search-places.interface.schema';
import { PlaceInputType } from '@googlemaps/google-maps-services-js/dist/common';

const logger = pino();

export class GooglePlaceService implements IPlaceService {
    private apiUrl: string = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

    async searchPlaces(query: string): Promise<Array<IPlaceResponseDTO>> {
        try {
            const response: AxiosResponse = await axios.get(this.apiUrl, {
                params: {
                    input: query,
                    inputtype: PlaceInputType.textQuery,
                    fields: 'name,geometry,rating,formatted_address',
                    key: process.env.GOOGLE_MAPS_API_KEY
                },
                timeout: 1000
            });

            if (response.data.status !== 'OK') {
                throw new Error(`Error occurred during place search: ${response.data.status}`);
            }

            return response.data.candidates.map((candidate: any): IPlaceResponseDTO => ({
                name: candidate.name,
                geometry: candidate.geometry,
                rating: candidate.rating,
                formatted_address: candidate.formatted_address
            }));
        } catch (err) {
            logger.error(err);
            return [];
        }
    }
}
