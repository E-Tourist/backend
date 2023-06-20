import { Request, Response } from 'express';
import { IUserController } from '@interfaces/controllers/api/user.interface.controller';
import { IUserResponseDTO } from '@interfaces/dto/responses/user.interface.schema';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.schema';
import { UserService } from '@common/services/user.service';
import { APIRouter, AuthType } from '@interfaces/controllers/api.interface';

export class UserController extends APIRouter implements IUserController {
    authType = AuthType.KEYCLOAK_TOKEN;

    constructor(private userService: UserService) {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.createRoute('post', '/users', this.createUser.bind(this));
    }

    async createUser(req: Request<any, IUserResponseDTO, IUserRequestDTO>, res: Response<IUserResponseDTO>): Promise<Response<IUserResponseDTO>> {
        const user = req.body;
        const newUser = await this.userService.createUser(user);
        return res.status(201).json(newUser);
    }
}