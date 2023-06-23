import { ViewAuthType, ViewController } from '@interfaces/controllers/common/view.interface';
import { Response, Request } from 'express';

export class ApiController extends ViewController {
    authType: ViewAuthType = ViewAuthType.NONE;

    constructor() {
        super('/interfaces');
    }
    initializeRoutes(): void {
        this.router.get(this.path, this.api);
    }

    api(req: Request, res: Response): void {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Content-Security-Policy', 'script-src blob:');
        res.header('Content-Security-Policy', 'worker-src blob:');
        return res.set('Cache-Control: no-store').sendFile('interfaces.html', {
            root: __dirname + '/../../../../views'
        });
    }

}
