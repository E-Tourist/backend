import { ClientSession } from 'mongoose';

export interface IBaseRepository<T = any> {
    find(id: string): Promise<T | null>;

    findMany(ids: Array<string>): Promise<Array<T>>;

    update(id: string, data: Record<keyof T, any>) : Promise<boolean>;
    insert(docs: T | Array<T>): Promise<Array<T>>;

    startSession(): Promise<ClientSession>;
}