import { IGoogleDirectionController } from '@interfaces/controllers/google-direction.interface.controller';
import { IGoogleDirectionService } from '@interfaces/services/google-direction.interface.service';
import { APIRouter, AuthType } from '@interfaces/controllers/common/api.interface';
import { IGoogleDirectionResponseDTO } from '@interfaces/dto/responses/google-direction.interface.dto';
import { IGoogleDirectionRequestDTO } from '@interfaces/dto/requests/google-direction.interface.dto';
import { Request, Response } from 'express';

export class GoogleDirectionController extends APIRouter implements IGoogleDirectionController {
    authType = AuthType.KEYCLOAK_TOKEN;

    constructor(private googleDirectionService: IGoogleDirectionService) {
        super('/directions');
    }

    initializeRoutes(): void {
        this.createRoute('get', this.path, this.getDirections.bind(this));
    }

    async getDirections(req: Request, res: Response): Promise<Response<IGoogleDirectionResponseDTO>> {
        const requestDto: IGoogleDirectionRequestDTO = {
            origin: req.query.origin as string,
            destination: req.query.destination as string,
            mode: req.query.mode as string,
            units: req.query.units as string
        };

        try {
            const responseDto: IGoogleDirectionResponseDTO = await this.googleDirectionService.getDirections(requestDto);

            if (!responseDto) {
                throw new Error('No response from service');
            }
            return res.status(200).json(responseDto);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
