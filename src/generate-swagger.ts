import { SwaggerGenerator } from '@common/services/common/swagger-generator';
import swaggerDocument from './base-swagger.json';
import fs from 'fs';
import { join } from 'path';


(() => {
    const gen = new SwaggerGenerator(swaggerDocument);

    const options = gen.generate();
    const dir = join(__dirname, '..', 'public');
    fs.mkdirSync(dir, {recursive: true});
    fs.writeFileSync(join(dir, 'swagger.json'), JSON.stringify(options));
})();