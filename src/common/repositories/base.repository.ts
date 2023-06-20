import { IBaseRepository } from '@interfaces/repositories/base.repository.interface';
import { BSONTypeError } from 'bson';
import { isArray } from 'lodash';
import mongoose, { ClientSession } from 'mongoose';

export abstract class BaseRepository<T extends mongoose.Document> implements IBaseRepository<T>{
    abstract getModel(): typeof mongoose.Model;

    async insert(docs: T | Array<T>): Promise<Array<T>> {
        const docsToInsert: Array<T> = isArray(docs) ? [...docs] : [docs];
        return this.getModel().insertMany<T>(docsToInsert);
    }

    async find(id: string): Promise<T | null> {
        try {
            const model = this.getModel();
            return model.findById(new mongoose.Types.ObjectId(id));
        } catch (e) {
            if (e instanceof BSONTypeError) {
                return null;
            }
            throw e;
        }
    }

    async findMany(ids: Array<string>): Promise<Array<T>> {
        try {
            const model = this.getModel();
            return model.find({ _id: { $in: ids } });
        } catch (e) {
            if (e instanceof BSONTypeError) {
                return [];
            }
            throw e;
        }
    }

    async update(id: string, data: Record<keyof T, any>): Promise<boolean> {
        const model = this.getModel();
        const doc = await model.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id)}, {
            $set: {...data}
        });

        return !!doc;
    }

    async startSession(): Promise<ClientSession> {
        return this.getModel().startSession();
    }
}