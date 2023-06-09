import { IAuth } from '@interfaces/auth/auth.interface';
import { AuthType } from '@interfaces/controllers/common/api.interface';
import { KeycloakAuthService } from '@common/config/keycloak/auth';

export class AuthServiceProvider {
    private authGuards = new Map<AuthType, IAuth>([
        [AuthType.KEYCLOAK_TOKEN, new KeycloakAuthService()]
    ]);

    getAuth(type: AuthType): IAuth | undefined {
        return this.authGuards.get(type);
    }
}