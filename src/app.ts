import express, { Request, Response } from 'express';
import stoppable from 'stoppable';
import ePino from 'express-pino-logger';
import pino, { SerializerFn } from 'pino';
import helmet from 'helmet';
import methodOverride from 'method-override';
import hpp from 'hpp';
import http from 'http';
import * as configProvider from '@common/config-provider';
import { NotFoundController } from '@controllers/common/notfound/notfound-controller';
import path from 'path';
import errorHandler from 'errorhandler';
import { CommonController, Api } from './controllers';
import { ApiController, APIRouter } from '@interfaces/controllers/api.interface';
import { ViewAuthType } from '@interfaces/controllers/view.interface';
import { MongoConnector } from '@common/db/mongo-connector';
import { AuthServiceProvider } from '@common/services/auth-service-provider';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

export class App {
    public app: express.Express;
    public server: any;

    constructor(
        public controllers: Array<CommonController>,
        public apis: Array<Api>,
        public port: number) {
            this.app = express();
            this.app.logger = pino();

            this.initLogger();
            this.initializeRenderEngine();
            this.initSecurity();
            this.initMiddlewares();
            this.initApiControllers();
            this.initCommonControllers();
            this.initializeNotFound();
            this.initMongoClient();

            process.once('SIGTERM', this.exitHandler.bind(this));
            process.once('SIGINT', this.exitHandler.bind(this));
        }

    listen(): void {
        this.server = http.createServer(this.app);

        this.server.listen(this.port, () => {
            this.app.logger.info(`${configProvider.getAppTitle()} listening on the port ${this.port}`);
            this.app.logger.info(`Visit http://localhost:${this.port}`);
        });
        stoppable(this.server, 10000);
    }

    private initCommonControllers(): void {
        this.controllers.forEach((controller) => {
            controller.initializeRoutes();
            const { router, authType } = controller;
            const controllerPath = controller.path;
            if (authType === ViewAuthType.BASIC) {
                const routerPath = `${controllerPath}/`;

                this.app.use(
                    routerPath,
                );
            }
            this.app.use(router);
        });
    }

    private initApiControllers(): void {

        const initializeControllers = (basePath: string, controllers: Array<ApiController>, authService: AuthServiceProvider): void => {
            // auth.initialize();
            controllers.forEach((controller) => {
                controller.initializeRoutes();
                const { router, authType } = controller;

                const controllerPath = controller.path;

                const routerPath = `${basePath}${controllerPath}/`;

                const auth = authService.getAuth(authType);

                if (auth) {
                    this.app.use(
                        routerPath,
                        APIRouter.handleErrorMiddleware(auth.handleApiKeyAuthorization())
                    );
                }
                this.app.use(basePath, router);
            });
        };

        initializeControllers(
            '/api',
            this.apis,
            new AuthServiceProvider()
        );
    }

    private initializeRenderEngine(): void {
        this.app.locals.title = configProvider.getAppTitle();
        this.app.locals.basedir = path.join(__dirname, '..', 'views');

        this.app.set('views', this.app.locals.basedir);
        this.app.set('view engine', 'pug');
    }

    private initLogger(): void {
        // serializers for production
        let serializers: Record<string, SerializerFn> | undefined = {
            req: (req: Request) => ({
                method: req.method,
                url: req.url
            }),
            res: (res: Response) => ({
                code: res.statusCode
            })
        };
        if (this.app.get('env') !== 'production') {
            serializers = undefined;
        }

        // logger on console
        this.app.use(
            ePino({
                serializers,
                logger: this.app.logger
            })
        );
    }

    private initSecurity(): void {
        this.app.use(helmet());
        this.app.disable('x-powered-by');

        if (this.app.get('env') === 'production') {
            this.app.logger.info('Production Environment');

            this.app.use(errorHandler());
        }
        // this.initSession();

        this.preventHTTPParameterPollution();
    }

    private initializeNotFound(): void {
        this.app.use(new NotFoundController().router);
    }

    // Prevent HTTP Parameter Pollution
    private preventHTTPParameterPollution(): void {
        this.app.use(hpp());
    }

    private initMiddlewares(): void {
        this.app.use(cors());
        this.app.use(methodOverride('_method')); // In query
        this.app.use(methodOverride('X-HTTP-Method')); // Microsoft
        this.app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
        this.app.use(methodOverride('X-Method-Override')); // IBM

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }));
    }

    private async initMongoClient(): Promise<void> {
        await MongoConnector.connect();
    }

    private exitHandler(): void {
        if (this.server) {
            this.server.close();
            this.app.logger.info(`Server on port ${this.port} closed`);
        }
    }
}