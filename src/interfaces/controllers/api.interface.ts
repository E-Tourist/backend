import { EntityDuplicatedKeyError } from '@common/errors/entity-duplicate-key-error';
import { EntityNotFoundError } from '@common/errors/entity-not-found-error';
import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import pino from 'pino';
import { Controller } from './controller.interface';

const logger = pino();

export interface IAnswerAPI {
    object: string;
    url: string;
    has_more: boolean;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Array<any | null>;
}

export interface IAnswerAPIMessage {
    message: string;
    code: number;
}

export interface IAnswerAPIError {
    messages: string | Array<string>;
    errorCode?: number | string;
    status: number;
    timestamp: string;
}

export enum CommonCodes {
    VALIDATION_ERROR = 1,
    PARSING_ERROR = 2,
    CONFIGURATION_ERROR = 3
}

export class APIError extends Error implements IAnswerAPIError {
    private _timestamp: string | null = null;

    public get timestamp(): string {
        if (!this._timestamp) {
            this.timestamp = (new Date()).toISOString();
        }
        return this._timestamp || (new Date()).toISOString();
    }

    protected set timestamp(value: string) {
        this._timestamp = value;
    }

    constructor(public messages: string | Array<string>, public status: number, public errorCode?: number | string) {
        super(typeof messages === 'string' ? messages : JSON.stringify(messages));
    }

    toJSON(): IAnswerAPIError {
        return {
            messages: this.messages,
            status: this.status,
            timestamp: this.timestamp,
            errorCode: this.errorCode
        };
    }
}

export const InternalAPIError = new APIError('internal error', 500);

export interface IAnswerAPIWithError {
    messages: string | Array<string>;
    status: number;
}

export enum AuthType {
    AUTH_TOKEN,
    KEYCLOAK_TOKEN,
    NONE,
}

export interface ApiController {
    router: express.Router;
    authType: AuthType;
    path: string;
    initializeRoutes(): void;
}

type RouteHandler = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
) => any | Promise<any>;

export abstract class APIRouter extends Controller implements ApiController {
    authType: AuthType = AuthType.AUTH_TOKEN;

    static handleErrorMiddleware(handler: RequestHandler): RequestHandler {
        return async (
            request: express.Request,
            response: express.Response,
            next: express.NextFunction,
        ) => {
            try {
                try {
                    await handler(request, response, next);
                } catch (error) {

                    if (error instanceof EntityNotFoundError) {
                        throw new APIError([error.message], 404);
                    }

                    if (error instanceof EntityDuplicatedKeyError) {
                        throw new APIError([`${error.entity} duplicated key`], 409);
                    }

                    throw error;
                }
            } catch (error) {
                if (error instanceof APIError) {
                    logger.info({
                        msg: error.message,
                        url: request.url,
                        body: request.body,
                        headers: request.headers,
                    });
                    return response.status(error.status).json(error.toJSON());
                }
                if (error instanceof Error) {
                    logger.error({
                        msg: `internal error while processing ${request.baseUrl + request.url}`,
                        error: error.message,
                        url: request.url,
                        body: request.body,
                        headers: request.headers,
                    });
                } else {
                    logger.error(error);
                }

                return response.status(500).json({
                    error: 'internal error',
                    code: 500,
                });
            }
        };
    }

    createRoute(
        method: 'get' | 'post' | 'put' | 'delete' | 'patch',
        path: string,
        ...handlers: Array<RequestHandler | ((req: Request<any>, response: Response, next?: NextFunction) => {})>
    ): void {
        this.router[method](path, ...handlers.map((handler) => APIRouter.handleErrorMiddleware(handler)));
    }
}
