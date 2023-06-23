import { IFileProvider } from '@interfaces/file-provider.interface';
import { readFileSync,  } from 'fs';
import { join } from 'path';
import mime from 'mime';
import * as swaggerUiDist from 'swagger-ui-dist';

export class SwaggerFileProvider implements IFileProvider{

    constructor(protected rootPath: string = swaggerUiDist.getAbsoluteFSPath()){}
    getMimeType(path: string): string {
        const filePath = this.getAbsoluteFilePath(path);
        const mimeType = mime.getType(filePath);
        if (!mimeType) {
            throw new Error(`Mime type for file '${filePath}' not found`);
        }

        return mimeType;
    }
    getAbsoluteFilePath(path: string): string {
        return join(this.rootPath, path);
    }
    getFileContent(path: string): string {
        const filePath = this.getAbsoluteFilePath(path);
        return readFileSync(filePath, {encoding: 'utf8'});
    }
}