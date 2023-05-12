# Description of the module
This is backend E-Tourist service written in NodeJS

# API extract

todo

# Install & Run
## Prerequisites
You need to:
1. Clone the repository;
2. Use in terminal: `docker-compose up -d --build` to build all services in module;
3. Get into: http://localhost:8080/auth (Keycloak Admin Console)
4. Login with credentials of: keycloak/keycloak
5. Configure Keycloak realm:
- create 'E-Tourist' realm,
- add 'backend-local' client configuration,
- setup 'admin' and 'user' roles,
- configure auth etc.
