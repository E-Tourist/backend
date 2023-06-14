import * as CryptoJS from 'crypto-js';
import * as configProvider from '@common/config-provider';

export class CryptService {
    public static encrypt(message: string): string {
        const key = configProvider.getCryptSecretKey();
        return CryptoJS.AES.encrypt(message, key).toString();
    }

    public static decrypt(message: string): string {
        const key = configProvider.getCryptSecretKey();
        return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
    }
}