import crypto from 'crypto';

export class HashService {
  public static genSignHash(hashObj: { [key: string]: any }): string {
    const jsonVal = JSON.stringify(hashObj);
    const hash = crypto.createHash('sha384');

    return hash.update(jsonVal).digest('hex');
  }
}
