import { isInteger, isString } from 'lodash';
import pino, { P } from 'pino';

const logger = pino();

export enum ApiUsersDriver {
    DATABASE = 'database',
}

export type KeycloakConfig = {
    url: string;
    secret: string;
    realm: string;
    clientId: string;
};

export function getSessionSecret(): string {
    const value = process.env.SESSION_SECRET;
    if (!value || !isString(value)) throw new Error('SESSION_SECRET is invalid');
    return value;
}

export function getAppTitle(): string {
    const value = process.env.APP_TITLE;
    if (!value || !isString(value)) throw new Error('APP_TITLE is invalid');
    return value;
}

export function getCryptSecretKey(): string {
    const value = process.env.CRYPT_SECRET_KEY;
    if (!value || !isString(value)) throw new Error('CRYPT_SECRET_KEY is invalid');
    return value;
}

export function getJWTSecretKey(): string {
    const value = process.env.JWT_SECRET_KEY;
    if (!value || !isString(value)) throw new Error('JWT_SECRET_KEY is invalid');
    return value;
}

export function getAuthThrottleRequestMax(): number {
    const value = Number(process.env.AUTH_THROTTLE_REQUEST_MAX);
    if (value && !isInteger(value)) return 0;
    return value;
}

export function getAuthThrottleRequestMinutes(): number {
    const value = Number(process.env.AUTH_THROTTLE_REQUEST_MINUTES);
    if (!value || !isInteger(value)) return 1;
    return value;
}

export function getAuthTokenHoursExpiration(): number {
    const value = Number(process.env.AUTH_TOKEN_HOURS_EXPIRATION);
    if (!value || !isInteger(value)) throw new Error('AUTH_TOKEN_HOURS_EXPIRATION is invalid');
    return value;
}

export function getSupportedApiUsersDrivers(): Array<ApiUsersDriver> {
    return [
        ApiUsersDriver.DATABASE,
    ];
}

export function getMongoConnString(): string {
    const value = process.env.MONGO_DB_CONN_STRING;
    if (!value) throw new Error('MONGO_DB_CONN_STRING is invalid');
    return value;
}

export function getMongoDbName(): string {
    const value = process.env.MONGO_DB_NAME;
    if (!value) throw new Error('MONGO_DB_NAME is invalid');
    return value;
}
export function getAppPort(): number{
    const value = Number(process.env.PORT);
    if (!value || !isInteger(value)) return 3000;
    return value;
}

export function getAppUrl(): string {
    const value = process.env.APP_URL;
    if (!value) return `http://localhost:${getAppPort()}`;
    return value;
}

export function getKeycloakConfig(): KeycloakConfig {
    const url = process.env.KEYCLOAK_AUTH_SERVER_URL;
    if (!url) throw new Error('KEYCLOAK_AUTH_SERVER_URL is invalid');
    const secret = process.env.KEYCLOAK_CREDENTIALS_SECRET;
    if (!secret) throw new Error('KEYCLOAK_CREDENTIALS_SECRET is invalid');

    const clientId = 'backend';
    const realm = 'E-Tourist';

    return {
        url,
        clientId,
        secret,
        realm
    };
}