import { Router } from 'express';

export abstract class Controller {
    constructor(
        public path = '/',
        public router = Router()
    ) {
    }

    abstract initializeRoutes(): void;
}