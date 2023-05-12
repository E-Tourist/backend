// keycloak.ts

import Keycloak from 'keycloak-connect';
import session from 'express-session';
import KeycloakConnect from "keycloak-connect";

export const memoryStore = new session.MemoryStore();

let keycloak: KeycloakConnect.Keycloak;
keycloak = new Keycloak({
    store: memoryStore
}, {
    'confidential-port': 0,
    'auth-server-url': 'http://localhost:8080/auth',
    'resource': 'backend-local',
    'ssl-required': 'external',
    'bearer-only': true,
    realm: 'E-Tourist'
});

export default keycloak;
