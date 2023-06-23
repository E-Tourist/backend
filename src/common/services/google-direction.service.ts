import { IGoogleDirectionService } from '@interfaces/services/google-direction.interface.service';
import { IGoogleDirectionRequestDTO } from '@interfaces/dto/requests/google-direction.interface.dto';
import { IGoogleDirectionResponseDTO } from '@interfaces/dto/responses/google-direction.interface.dto';
import axios from 'axios';

export class GoogleDirectionService implements IGoogleDirectionService {
    private apiUrl: string = 'https://maps.googleapis.com/maps/api/directions/json';

    async getDirections(requestDTO: IGoogleDirectionRequestDTO): Promise<IGoogleDirectionResponseDTO> {
        const { origin, destination, mode = 'driving', units = 'metric' } = requestDTO;
        const url = `${this.apiUrl}?origin=${origin}&destination=${destination}&mode=${mode}&units=${units}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

        const response = await axios.get<IGoogleDirectionResponseDTO>(url);

        return response.data;
    }
}