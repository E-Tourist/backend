[# Description of the module

This is backend E-Tourist service written in NodeJS using Express

## Requirements

-   Node: v18.16.0 (LTS)
-   npm: 9.6.6
-   setting up `./deployment` with MongoDB & Keycloak connection

# Install & Run
## Prerequisites


1. Use in terminal:
   From `./backend` -> `docker-compose -f ../deployment/docker-compose.yml --project-name e-tourist up -d --build --force-recreate` to build all services in module
2. Create `.env` file in `./backend` root directory for environment parameters by using `template.env` and fill the values

## How to start the server

Scripts are written for Windows so there may be some changes in syntax.
-   `npm i` to install packages.
-   `npm run build` to build the project.
-   `npm run server` to run the server.

## Other scripts

-   `npm run watch-ts` - monitors changes in TypeScript files and automatically compiles them
-   `npm run watch-node` - monitors changes in the output JavaScript files and automatically runs the server using nodemon, additionally formatting the output using pino-pretty
-   `npm run watch` - executes database migrations and concurrently monitors changes in TypeScript and output JavaScript files.
-   `npm run test` - runs tests using the Jest framework
-   `npm run test:watch` - runs tests in watch mode, automatically executing them after each change
-   `npm run test:cov` - runs tests with code coverage reporting using the Jest framework
-   `npm run test:verb` - runs tests and displays detailed information about their execution
-   `npm run tslint` - performs static code analysis of TypeScript code using the tslint tool
-   `npm run clean` - removes the output folder.
-   `npm run copy-static` - creates a folder and copies static files (e.g., view files) to the output folder.
-   `npm run generate:swagger` - generates a Swagger documentation file based on the code and saves it in JSON format, then transforms it into an HTML file using the Redocly CLI tool.
-   `npm run redoc:bundle` - generates a Swagger documentation file and transforms it into an HTML file using the Redocly CLI tool.
-   `npm run migrate` - executes database migrations in the upward direction (performs migrations).
-   `npm run migrate:down` - rolls back the latest database migration (performs migration in the downward direction).
-   `npm run migrate:new` - creates a new database migration file using the mongo-migrate tool.

# API extract

Open API Documentation under: http://localhost:8081/api
]()