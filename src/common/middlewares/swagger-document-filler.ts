import { Response, Request, NextFunction, RequestHandler } from 'express';
import { SwaggerDefinition } from 'swagger-jsdoc';

export function swaggerDocumentFiller(swaggerDocument: SwaggerDefinition) : RequestHandler{
    return (req: Request, res: Response, next: NextFunction) => {
        swaggerDocument.host = req.get('host');
        next();
    };
}
