
export class EntityDuplicatedKeyError extends Error {
    constructor(public entity: string, public key: string) {
        super(`${entity} already exists (duplicated key: ${key})`);
    }
}