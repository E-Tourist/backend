
import { BasicUsersService } from '@common/services/auth/basic_users';
import { Handler, NextFunction, Request, Response } from 'express';
import basicAuth from 'express-basic-auth';

export function basicAuthMiddleware(basicUsersService = new BasicUsersService()): Handler {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        const basicUsers = await basicUsersService.getUsers();
        basicAuth({
            challenge: true,
            users: basicUsers
        })(request, response, next);
    };
}