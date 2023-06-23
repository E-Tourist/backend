import { IGoogleDirectionResponseDTO } from '@interfaces/dto/responses/google-direction.interface.dto';
import { IGoogleDirectionRequestDTO } from '@interfaces/dto/requests/google-direction.interface.dto';

export interface IGoogleDirectionService {
    getDirections(requestDto: IGoogleDirectionRequestDTO): Promise<IGoogleDirectionResponseDTO>;
}