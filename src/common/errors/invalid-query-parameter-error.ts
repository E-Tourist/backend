export class InvalidQueryParameterError extends Error {
    constructor() {
        super('Invalid query parameter');
        this.name = 'InvalidQueryParameterError';
    }
}