import pino from 'pino';

export { };

declare global {
    namespace Express {
        export interface Application {
            logger: pino.Logger;
        }

        export interface User {
            email?: string;
            username: string;
        }
    }
}
