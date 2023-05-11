# Description of the module
This is backend E-Tourist service

# API extract

todo

# Install & Run
## Prerequisites
You need to:
1. Clone the repository;
2. Use in terminal: `docker-compose up -d --build` to build all services in module;
3. Get into: http://localhost:8080/auth (Keycloak Admin Console)
4. Login with crudentials of: keycloak/keycloak
5. Configure Keycloak realm:
- create 'E-Tourist' realm,
- add 'backend' client, 
- setup 'admin' and 'user' roles,
- configure auth etc.
