import { Response, Request } from 'express';
import { Auth } from '@common/services/auth/auth';
import { APIRouter, AuthType } from '@interfaces/controllers/api.interface';
import rateLimit from 'express-rate-limit';
import * as configProvider from '@common/config-provider';
import { IAuthController } from '@interfaces/controllers/auth/auth.interface.controller';
import { IInvalidCredentialsDTO } from '@interfaces/dto/responses/auth-failed.interface.schema';
import { IAuthorizationRequestDTO } from '@interfaces/dto/requests/auth-request.interface.schema';
import { IAuthorizationSuccessDTO } from '@interfaces/dto/responses/auth-success.interface.schema';
import { AuthAssertions } from '@common/assertions/auth';

export class AuthController extends APIRouter implements IAuthController{
  authType = AuthType.NONE;

  constructor() {
    super('/auth');
  }



  async login(req: Request<any, any, IAuthorizationRequestDTO>, res: Response<IAuthorizationSuccessDTO | IInvalidCredentialsDTO>): Promise<Response<IAuthorizationSuccessDTO | IInvalidCredentialsDTO>> {
    const auth = new Auth();
    const response = await auth.login(req.body);
    if (AuthAssertions.assertInvalidCredentials(response)) {
      return res.status(401).json(response);
    }
    return res.status(200).json(response);
  }

  public initializeRoutes(): void {
    this.createRoute('get', this.path, this.loginInfo);
    this.createRoute('post', this.path, rateLimit({
      max: configProvider.getAuthThrottleRequestMax(),
      windowMs: configProvider.getAuthThrottleRequestMinutes() * 60 * 1000,
      message: 'Too many requests sent by this ip, please try again in an hour!'
    }), this.login.bind(this));
  }


  /**
   * Login action
   */
  loginInfo(request: Request, response: Response): Response {
    return response.status(200).send('OK');
  }
}
