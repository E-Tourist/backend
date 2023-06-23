import { StartController } from '@controllers/common/start/start-controller';
import { ApiController } from '@interfaces/controllers/common/api.interface';

import { DocsController } from '@controllers/common/api/docs.controller';
import { ApiController as CommonApiController } from '@controllers/common/api/api.controller';
import { SwaggerController } from '@controllers/common/swagger/swagger.controller';
import { ViewController } from '@interfaces/controllers/common/view.interface';
import { GooglePlaceService } from '@common/services/google-place.service';
import { UserController } from '@controllers/api/user.controller';
import { UserService } from '@common/services/user.service';
import { GoogleDirectionService } from '@common/services/google-direction.service';
import { MapRouteController } from '@controllers/api/map-route.controller';
import { MapRouteService } from '@common/services/map-route.service';
import { GooglePlaceController } from '@controllers/api/google-place.controller';
import { GoogleDirectionController } from '@controllers/api/google-direction.controller';
import { TestController } from '@controllers/api/test.controller';

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
const userService = new UserService();
const userRouteService = new MapRouteService();
export const apis: Array<Api> = [
    new GooglePlaceController(googlePlaceService),
    new GoogleDirectionController(googleDirectionService),
    new UserController(userService),
    new MapRouteController(userRouteService),
    new TestController()
];
