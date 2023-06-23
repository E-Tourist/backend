import { SwaggerFileProvider } from '@common/services/common/swagger-file-provider';
import { ISwaggerFileRequestDTO } from '@interfaces/dto/requests/swagger-file-request.interface';
import { ViewAuthType, ViewController } from '@interfaces/controllers/common/view.interface';
import { IFileProvider } from '@interfaces/file-provider.interface';
import { Request, Response } from 'express';

export class SwaggerController extends ViewController {
    authType: ViewAuthType = ViewAuthType.NONE;

    constructor(protected fileProvider: IFileProvider = new SwaggerFileProvider()) {
        super('/:swaggerFileName(swagger*)');
    }

    initializeRoutes(): void {
        this.router.get(this.path, this.swaggerFile.bind(this));
    }

    swaggerFile(req: Request<ISwaggerFileRequestDTO>, res: Response) : void{
        const { swaggerFileName } = req.params;
        const filePath = this.fileProvider.getAbsoluteFilePath(swaggerFileName);
        const mimeType = this.fileProvider.getMimeType(swaggerFileName);
        res.set('content-type', mimeType);
        return res.sendFile(filePath);
    }
}