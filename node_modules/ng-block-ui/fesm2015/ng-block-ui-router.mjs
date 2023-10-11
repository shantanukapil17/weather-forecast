import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1 from 'ng-block-ui';
import { BLOCKUI_DEFAULT, BlockUIModule } from 'ng-block-ui';

class BlockUIPreventNavigation {
    constructor(blockUIService) {
        this.blockUIService = blockUIService;
    }
    canActivate() {
        return !this.blockUIService.isActive(BLOCKUI_DEFAULT);
    }
    canActivateChild() {
        return !this.blockUIService.isActive(BLOCKUI_DEFAULT);
    }
}
BlockUIPreventNavigation.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIPreventNavigation, deps: [{ token: i1.BlockUIService }], target: i0.ɵɵFactoryTarget.Injectable });
BlockUIPreventNavigation.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIPreventNavigation });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIPreventNavigation, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BlockUIService }]; } });

class BlockUIRouterModule {
    static forRoot() {
        return {
            ngModule: BlockUIRouterModule,
            providers: [
                BlockUIPreventNavigation
            ]
        };
    }
}
BlockUIRouterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIRouterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlockUIRouterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: BlockUIRouterModule, imports: [BlockUIModule] });
BlockUIRouterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIRouterModule, imports: [BlockUIModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIRouterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BlockUIModule
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BlockUIPreventNavigation, BlockUIRouterModule };
//# sourceMappingURL=ng-block-ui-router.mjs.map
