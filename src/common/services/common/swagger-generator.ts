import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import * as configProvider from '@common/config-provider';

export class SwaggerGenerator {
    constructor(protected swaggerDefinition: SwaggerDefinition) {}
    generate() : swaggerJSDoc.Options {
        this.swaggerDefinition.servers = this.swaggerDefinition.servers.map((server: {url: string, description?: string}) => {
            if (!server.url.match(/^(http|https):\/\//)) {
                const appUrl = configProvider.getAppUrl().replace(/\/$/, '');
                server.url = `${appUrl}/${server.url.replace(/^\//, '')}`;
                server.description = 'Generated server url';
            }
            return server;
        });
        return swaggerJSDoc({
            definition: this.swaggerDefinition,
            apis: ['./src/controllers/**/*.controller.ts', './src/dto/**/*.dto.ts']
        });
    }
}