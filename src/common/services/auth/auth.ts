// JWT - start
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ApiUsersService } from './api_users';
import passport from 'passport';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import { Keccak } from 'sha3';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { CryptService } from '../crypto/crypt-service';
import * as configProvider from '@common/config-provider';
import { IApiUser } from '@interfaces/models/api_user';
import { IAuthToken } from '@interfaces/auth/auth-token.interface';
import { IApiUsersService } from '@interfaces/auth/api-users-service.interface';
import { IAuthorizationSuccessDTO } from '@interfaces/dto/responses/auth-success.interface.schema';
import { IInvalidCredentialsDTO } from '@interfaces/dto/responses/auth-failed.interface.schema';
import { IAuthorizationRequestDTO } from '@interfaces/dto/requests/auth-request.interface.schema';
import { IAuth } from '@interfaces/auth/auth.interface';

export class Auth implements IAuth {
  protected passport: passport.Authenticator;

  constructor(
    protected jwtSecretKey: string = '', // configProvider.getJWTSecretKey(),
    protected apiUsersService: IApiUsersService = new ApiUsersService()) {
    this.passport = new passport.Passport();
  }

  /**
   * Should be called only once. If called one after another, the strategy of second call will bu used
   * @returns {void}
   */
  public initialize = () => {
    this.passport.use(this.getStrategy());
    return this.passport.initialize();
  };

  public authenticate = (callback: any) =>
    this.passport.authenticate('jwt', { session: false, failWithError: true }, callback);

  public handleApiKeyAuthorization(): RequestHandler {
    return (request: Request, response: Response, next: NextFunction) => {
      return this.authenticate((err: any, user: any, info: any) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          if (info.name === 'TokenExpiredError') {
            return response
              .status(401)
              .json({ message: 'Your token has expired. Please generate a new one' });
          } else {
            return response.status(401).json({ message: info.message });
          }
        }

        request.user = user;
        return next();
      })(request, response, next);
    };
  }

  async login(request: IAuthorizationRequestDTO): Promise<IAuthorizationSuccessDTO | IInvalidCredentialsDTO> {
    try {
      const user = await this.apiUsersService.getUserByUsername(request.username);

      if (user === undefined) throw Error('User not found or invalid password');
      if (user === null) throw Error('User not found or invalid password');

      const apiUser = {
        id: user.id,
        username: user.username,
        password: this.hashPassword(CryptService.decrypt(user.password))
      };

      if (apiUser && apiUser.password && apiUser.password === this.hashPassword(request.password)) {
        return this.genToken(apiUser);
      } else {
        throw Error('User not found or invalid password');
      }
    } catch (err) {
      return { message: 'Invalid credentials', errors: err };
    }
  }

  private hashPassword = (pass: string) => {
    const d = new Keccak(224);
    d.update(pass ? pass : '');
    return d.digest('hex');
  };
  private genToken = (user: IApiUser): IAuthToken => {
    const expires = moment
      .utc()
      .add({ hours: configProvider.getAuthTokenHoursExpiration() })
      .unix();
    const token = jwt.encode(
      {
        exp: expires,
        user: user.username,
        id: user.id,
      },
      this.jwtSecretKey,
    );

    return {
      token,
      expires: moment.unix(expires).format(),
      user: user.id,
    };
  };

  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: this.jwtSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    };
    return new Strategy(params, async (req: any, payload: any, done: any) => {
      const user = await this.apiUsersService.getUserByUsername(payload.user);
      if (user && user.id === payload.id) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'The user in the token was not found' });
      }
    });
  };
}
