process.setMaxListeners(0);

if (!process.env.PORT) {
    process.env.PORT = '8081';
}

import { commonControllers, apis } from '@controllers/controllers';
import { App } from './app';

const app = new App(commonControllers, apis, 8081);
app.listen();