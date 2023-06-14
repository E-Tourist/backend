import { Controller } from './controller.interface';

export enum ViewAuthType {
    BASIC,
    NONE,
}

export abstract class ViewController extends Controller {
    authType: ViewAuthType = ViewAuthType.NONE;
}