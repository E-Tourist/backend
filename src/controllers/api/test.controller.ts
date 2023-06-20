// test-controller.ts
import { Request, Response, Router } from 'express';
import { ITestController } from '@interfaces/controllers/api/test.interface.controller';
import { AuthType, APIRouter } from '@interfaces/controllers/api.interface';

export class TestController extends APIRouter implements ITestController {
    authType = AuthType.KEYCLOAK_TOKEN;
    path = '/test';
    router: Router;

    constructor() {
        super();
        this.router = Router();
        this.initializeRoutes();
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
