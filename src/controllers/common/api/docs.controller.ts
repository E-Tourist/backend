import { ViewAuthType, ViewController } from '@interfaces/controllers/common/view.interface';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../base-swagger.json';
import { swaggerDocumentFiller } from '@common/middlewares/swagger-document-filler';
import { SwaggerGenerator } from '@common/services/common/swagger-generator';

export class DocsController extends ViewController {
    authType: ViewAuthType = ViewAuthType.NONE;
    constructor() {
        super('/docs');
    }

    initializeRoutes(): void {
        const gen = new SwaggerGenerator(swaggerDocument);
        const swaggerOptions = gen.generate();

        this.router.use(this.path, swaggerUi.serve);
        this.router.get(this.path,
            swaggerDocumentFiller(swaggerDocument),
            swaggerUi.setup(swaggerOptions)
        );
    }
}
