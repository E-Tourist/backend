import { RequestHandler } from 'express';


export interface IAuth {
    handleApiKeyAuthorization(): RequestHandler;
}