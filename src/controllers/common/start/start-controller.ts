import { Response, Request } from 'express';
import { ViewController } from '@interfaces/controllers/common/view.interface';

export class StartController extends ViewController {
  constructor() {
    super('/');
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.welcome);
  }

  public welcome(request: Request, response: Response): void {
    return response.render('home', {});
  }
}
