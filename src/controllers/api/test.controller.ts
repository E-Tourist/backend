import { Request, Response } from 'express';
import { ITestController } from '@interfaces/controllers/test.interface.controller';
import { AuthType, APIRouter } from '@interfaces/controllers/common/api.interface';

export class TestController extends APIRouter implements ITestController {
    authType = AuthType.KEYCLOAK_TOKEN;

    constructor() {
        super('/test');
    }

    initializeRoutes(): void {
        this.createRoute('get', this.path, this.test.bind(this));
    }

    async test(req: Request, res: Response): Promise<void> {
        res.status(200).send({
            success: true,
            message: 'Autoryzacja przebiegła pomyślnie!'
        });
    }
}
