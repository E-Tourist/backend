import { IRate } from '@interfaces/models/rate.interface';
import { IRateRepository } from '@interfaces/repositories/rate.repository.interface';
import { RateModel } from '@common/models/rate';

export class RateRepository implements IRateRepository {
    async createRate(user: IRate): Promise<IRate> {
        const userModel = new RateModel(user);
        return await userModel.save();
    }
}