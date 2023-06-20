import { StartController } from '@controllers/common/start/start-controller';
import { ApiController } from '@interfaces/controllers/api.interface';

import { DocsController } from '@controllers/common/api/docs.controller';
import { ApiController as CommonApiController } from '@controllers/common/api/api.controller';
import { SwaggerController } from '@controllers/common/swagger/swagger.controller';
import { ViewController } from '@interfaces/controllers/view.interface';
import { GooglePlaceService } from '@common/services/google/places/place-service';
import { PlaceController } from '@controllers/api/place.controller';
import { TestController } from '@controllers/api/test.controller';
import { UserController } from '@controllers/api/user.controller';
import { UserService } from '@common/services/user.service';
import { UserRepository } from '@common/repositories/user.repository';

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
const userService = new UserService(new UserRepository());
export const apis: Array<Api> = [
    new PlaceController(googlePlaceService),
    new UserController(userService),
    new TestController()
];
