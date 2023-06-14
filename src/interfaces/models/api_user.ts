
export interface IApiUser {
    id: string;
    username: string;
    password: string;
    roles?: Array<string>;
}


export class ApiUserPredicates {
    static IS_API_USER = (value: object): value is IApiUser => {
        return value.hasOwnProperty('id') && value.hasOwnProperty('username') && value.hasOwnProperty('password');
    }
}