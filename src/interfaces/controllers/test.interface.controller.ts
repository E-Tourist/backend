import { Request, Response } from 'express';

export interface ITestController {
    test(req: Request, res: Response): Promise<void>;
}