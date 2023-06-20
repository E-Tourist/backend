process.setMaxListeners(0);

if (!process.env.PORT) {
    process.env.PORT = '8081';
}

import { commonControllers, apis } from '@controllers/controllers';
import { App } from './app';

const app = new App(commonControllers, apis, parseInt(process.env.PORT, 10));
app.listen();