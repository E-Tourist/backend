import express from 'express';
import session from 'express-session';
import keycloak, { memoryStore } from './auth/keycloak';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

app.use(keycloak.middleware());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/protected-route', keycloak.protect(), (req, res) => {
    res.send('You are on the protected route');
});

// Swagger JSDoc configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Tourist API',
            version: '1.0.0',
            description: 'API for E-Tourist service',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./src/**/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});