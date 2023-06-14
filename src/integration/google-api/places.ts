import { Client, Status } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export const getPlaceDetails = async (placeName: string) => {
    try {
        const response = await client.placeDetails({
            params: {
                place_id: placeName,
                key: process.env.GOOGLE_MAPS_API_KEY || '',
            },
            timeout: 1000,
        });

        if (response.data.status === Status.OK) {
            return response.data.result;
        } else {
            throw new Error(response.data.error_message);
        }
    } catch (error) {
        throw error;
    }
};