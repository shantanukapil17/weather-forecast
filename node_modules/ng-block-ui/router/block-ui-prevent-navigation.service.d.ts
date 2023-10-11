import { CanActivate, CanActivateChild } from '@angular/router';
import { BlockUIService } from 'ng-block-ui';
import * as i0 from "@angular/core";
export declare class BlockUIPreventNavigation implements CanActivate, CanActivateChild {
    private blockUIService;
    constructor(blockUIService: BlockUIService);
    canActivate(): boolean;
    canActivateChild(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockUIPreventNavigation, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BlockUIPreventNavigation>;
}
