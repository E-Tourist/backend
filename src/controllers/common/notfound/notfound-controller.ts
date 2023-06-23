import { Controller } from '@interfaces/controllers/common/controller.interface';
import { Response, Request } from 'express';

export class NotFoundController extends Controller {
  constructor() {
    super('/*');
  }

  public initializeRoutes(): void {
    this.router.all(this.path, this.notFoundInfo);
  }

  /**
   * Answer Not Found path for API
   */
  public notFoundInfo(request: Request, response: Response): void | Response {
    response.status(404);

    if (request.accepts('html')) {
      return response.render('errors/error.pug', {
        code: 404,
        message: 'Not found',
        description: request.url,
      });
    }

    return response.status(404).json({ code: 404, msg: 'Route not found' });
  }
}
