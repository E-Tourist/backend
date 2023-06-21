import { IGoogleDirectionResponseDTO } from '@interfaces/dto/responses/google/get-direction.interface.schema';
import { IGoogleDirectionRequestDTO } from '@interfaces/dto/requests/google/get-directions.interface.schema';

export interface IGoogleDirectionService {
    getDirections(requestDto: IGoogleDirectionRequestDTO): Promise<IGoogleDirectionResponseDTO>;
}