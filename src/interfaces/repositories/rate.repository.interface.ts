import { IRate } from '@interfaces/models/rate.interface';

export interface IRateRepository {
    createRate(rate: IRate): Promise<IRate>;
}
