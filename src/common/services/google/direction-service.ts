import axios from 'axios';
import { IGoogleDirectionService } from '@interfaces/services/google/direction.interface.service';
import { IGoogleDirectionRequestDTO } from '@interfaces/dto/requests/google/get-directions.interface.schema';
import { IGoogleDirectionResponseDTO } from '@interfaces/dto/responses/google/get-direction.interface.schema';

export class GoogleDirectionService implements IGoogleDirectionService {
    private apiUrl: string = 'https://maps.googleapis.com/maps/api/directions/json';

    async getDirections(requestDto: IGoogleDirectionRequestDTO): Promise<IGoogleDirectionResponseDTO> {
        const { origin, destination, mode = 'driving', units = 'metric' } = requestDto;
        const url = `${this.apiUrl}?origin=${origin}&destination=${destination}&mode=${mode}&units=${units}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

        const response = await axios.get<IGoogleDirectionResponseDTO>(url);

        return response.data;
    }
}