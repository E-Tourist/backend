import { StartController } from '@controllers/common/start/start-controller';
import { ApiController } from '@interfaces/controllers/api.interface';

import { DocsController } from '@controllers/common/api/docs.controller';
import { ApiController as CommonApiController } from '@controllers/common/api/api.controller';
import { SwaggerController } from '@controllers/common/swagger/swagger.controller';
import { ViewController } from '@interfaces/controllers/view.interface';

export declare type CommonController = SwaggerController | CommonApiController | StartController | ViewController;
export declare type Api = ApiController;

export const commonControllers: Array<CommonController> = [
    new StartController(),
    new DocsController(),
    new CommonApiController(),
    new SwaggerController()
];

/**
 * Controllers for real data
 */
export const apis: Array<Api> = [
    // new AuthControllerV2()
];
