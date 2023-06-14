
export class EntityNotFoundError extends Error {
    constructor(public entity: string, public id: string) {
        super(`${entity} not found (value: ${id})`);
    }
}