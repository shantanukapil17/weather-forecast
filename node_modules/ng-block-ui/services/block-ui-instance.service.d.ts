import { Observable } from 'rxjs';
import { NgBlockUI } from '../models/block-ui.model';
import { BlockUISettings } from '../models/block-ui-settings.model';
import * as i0 from "@angular/core";
export declare class BlockUIInstanceService {
    blockUISettings: BlockUISettings | any;
    blockUIInstances: any;
    private blockUISubject;
    private blockUIObservable;
    constructor();
    getSettings(): BlockUISettings | any;
    updateSettings(settings?: BlockUISettings | any): void;
    decorate(name?: string): NgBlockUI;
    observe(): Observable<any>;
    clearInstance(instanceName: string): void;
    private blockUIMiddleware;
    private dispatch;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockUIInstanceService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BlockUIInstanceService>;
}
