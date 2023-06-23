import { Request, Response } from 'express';
import { IUserController } from '@interfaces/controllers/user.interface.controller';
import { IUserRequestDTO } from '@interfaces/dto/requests/user.interface.dto';
import { APIRouter, AuthType } from '@interfaces/controllers/common/api.interface';
import { IUserProfileResponseDTO } from '@interfaces/dto/responses/user-profile.interface.dto';
import { ParamsDictionary } from 'express-serve-static-core';
import { IUserService } from '@interfaces/services/user.interface.service';
import { IUserUpdateRequestDTO } from '@interfaces/dto/requests/user-update.interface.dto';
import { IUserShortResponseDTO } from '@interfaces/dto/responses/user-short.interface.dto';

export class UserController extends APIRouter implements IUserController {
    authType = AuthType.KEYCLOAK_TOKEN;

    constructor(private userService: IUserService) {
        super();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.createRoute('post', '/users', this.createUser.bind(this));
        this.createRoute('get', '/users', this.getAllUsers.bind(this));
        this.createRoute('get', '/users/:externalId', this.getUser.bind(this));
        this.createRoute('put', '/users/:externalId', this.updateUser.bind(this));
    }

    async createUser(req: Request<any, string, IUserRequestDTO>, res: Response<string>): Promise<Response<string>> {
        const userDTO = req.body;
        const userId = await this.userService.createUser(userDTO);
        return res.status(201).send(userId);
    }

    async getAllUsers(req: Request, res: Response<Array<IUserShortResponseDTO>>): Promise<Response<Array<IUserShortResponseDTO>>> {
        const users = await this.userService.getAllUsers();
        return res.status(200).json(users);
    }

    async getUser(req: Request<ParamsDictionary>, res: Response<IUserProfileResponseDTO>): Promise<Response<IUserProfileResponseDTO>> {
        const externalId = req.params.externalId;
        const userDto = await this.userService.getUser(externalId);
        return res.status(200).json(userDto);
    }

    async updateUser(req: Request<ParamsDictionary, any, IUserUpdateRequestDTO>, res: Response): Promise<Response> {
        const externalId = req.params.externalId;
        const updateDto = req.body;
        await this.userService.updateUser(externalId, updateDto);
        return res.status(200).send();
    }
}