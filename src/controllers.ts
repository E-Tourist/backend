import { StartController } from '@controllers/common/start/start-controller';
import { ApiController } from '@interfaces/controllers/api.interface';

import { DocsController } from '@controllers/common/api/docs.controller';
import { ApiController as CommonApiController } from '@controllers/common/api/api.controller';
import { SwaggerController } from '@controllers/common/swagger/swagger.controller';
import { ViewController } from '@interfaces/controllers/view.interface';
import { GooglePlaceService } from '@common/services/google/place-service';
import { GooglePlaceController } from '@controllers/api/google/place.controller';
import { TestController } from '@controllers/api/test.controller';
import { UserController } from '@controllers/api/user.controller';
import { UserService } from '@common/services/user.service';
import { UserRepository } from '@common/repositories/user.repository';
import { GoogleDirectionController } from '@controllers/api/google/direction.controller';
import { GoogleDirectionService } from '@common/services/google/direction-service';

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
const googlePlaceService = new GooglePlaceService();
const googleDirectionService = new GoogleDirectionService();
const userService = new UserService(new UserRepository());
export const apis: Array<Api> = [
    new GooglePlaceController(googlePlaceService),
    new GoogleDirectionController(googleDirectionService),
    new UserController(userService),
    new TestController()
];
