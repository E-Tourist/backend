import { IInvalidCredentialsDTO } from '@interfaces/dto/responses/auth-failed.interface.schema';

export class AuthAssertions {
    static assertInvalidCredentials(resp?: null | {} | IInvalidCredentialsDTO) : resp is IInvalidCredentialsDTO{
        return !!resp && 'message' in resp && 'errors' in resp;
    }
}