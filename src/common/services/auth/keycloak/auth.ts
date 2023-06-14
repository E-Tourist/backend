import * as configProvider from '@common/config-provider';
import { IAuth } from '@interfaces/auth/auth.interface';
import { Request, RequestHandler, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import KeycloakConnect from 'keycloak-connect';
import pino from 'pino';
import { ExtractJwt } from 'passport-jwt';
import { APIError } from '@interfaces/controllers/api.interface';

const logger = pino();

export interface KeycloakUserInfo {
    sub: string;
    email_verified: boolean;
    name: string;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

export class KeycloakAuthService implements IAuth {
    private static keycloak: KeycloakConnect.Keycloak;

    constructor(
        protected config: configProvider.KeycloakConfig = configProvider.getKeycloakConfig()
    ) {
        KeycloakAuthService.keycloak = this.init();
    }

    handleApiKeyAuthorization(): RequestHandler {
        return (async (req: Request, res: Response, next: NextFunction) => {
            const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
            if (!token) throw new APIError(['Token not found'], 401);
            try {
                const userInfo = await KeycloakAuthService.keycloak.grantManager.userInfo<string, KeycloakUserInfo>(token);

                req.user = {
                    username: userInfo.preferred_username,
                    email: userInfo.email
                };

                next();
            } catch (e) {
                throw new APIError(['Your token is invalid (probably expired). Please generate a new one'], 403);
            }
        }).bind(this);
    }

    init(): KeycloakConnect.Keycloak {
        if (KeycloakAuthService.keycloak) {
            logger.warn('Trying to init Keycloak again!');
            return KeycloakAuthService.keycloak;
        } else {
            logger.info('Initializing Keycloak...');
            KeycloakAuthService.keycloak = new KeycloakConnect({}, {
                'auth-server-url': this.config.url,
                'bearer-only': true,
                'ssl-required': 'external',
                resource: this.config.clientId,
                realm: this.config.realm,
                'confidential-port': 443,
                credentials: {
                    secret: this.config.secret
                }
            } as unknown as KeycloakConnect.KeycloakConfig);
            return KeycloakAuthService.keycloak;
        }
    }

    public getKeycloakInstance(): KeycloakConnect.Keycloak {
        return KeycloakAuthService.keycloak;
    }
}