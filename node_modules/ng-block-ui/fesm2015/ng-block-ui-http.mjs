import * as i0 from '@angular/core';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as i1 from 'ng-block-ui';
import { BLOCKUI_DEFAULT, BlockUIModule } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';

class BlockUIHttpSettings {
    constructor() {
        this.settings = {};
    }
}
BlockUIHttpSettings.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIHttpSettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BlockUIHttpSettings.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIHttpSettings });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIHttpSettings, decorators: [{
            type: Injectable
        }] });

class BlockUIInterceptor {
    constructor(blockUIService, blockUIHttpSettings) {
        this.blockUIService = blockUIService;
        this.blockUIHttpSettings = blockUIHttpSettings;
        this.activeHttpRequests = 0;
    }
    intercept(request, next) {
        let active = false;
        if (this.shouldBlock(request)) {
            this.blockUIService.start(BLOCKUI_DEFAULT);
        }
        return next.handle(request)
            .pipe(finalize(() => {
            if (this.shouldBlock(request)) {
                const { blockAllRequestsInProgress } = this.blockUIHttpSettings.settings;
                const method = blockAllRequestsInProgress ? 'stop' : 'reset';
                this.blockUIService[method](BLOCKUI_DEFAULT);
            }
        }));
    }
    shouldBlock(request) {
        const { method, urlWithParams } = request;
        const { settings } = this.blockUIHttpSettings;
        const requestFilters = settings.requestFilters || [];
        return !requestFilters.some((f) => {
            if (f && f.method && f.url) {
                return f.method.toUpperCase() === method && f.url.test(urlWithParams);
            }
            else if (typeof f === 'function') {
                return f(request);
            }
            return f.test(urlWithParams);
        });
    }
}
BlockUIInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIInterceptor, deps: [{ token: i1.BlockUIService }, { token: BlockUIHttpSettings }], target: i0.ɵɵFactoryTarget.Injectable });
BlockUIInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIInterceptor });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.BlockUIService }, { type: BlockUIHttpSettings }]; } });

// Needed for AOT compiling
const BlockUIHttpModuleSettings = new InjectionToken('BlockUIHttpModuleSettings');
function provideSettingsInstance(settings) {
    return {
        settings: Object.assign({ blockAllRequestsInProgress: true }, settings)
    };
}
class BlockUIHttpModule {
    static forRoot(settings = {}) {
        return {
            ngModule: BlockUIHttpModule,
            providers: [
                {
                    provide: BlockUIHttpModuleSettings,
                    useValue: settings
                },
                {
                    provide: BlockUIHttpSettings,
                    useFactory: provideSettingsInstance,
                    deps: [BlockUIHttpModuleSettings]
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BlockUIInterceptor,
                    multi: true
                }
            ]
        };
    }
}
BlockUIHttpModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIHttpModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlockUIHttpModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: BlockUIHttpModule, imports: [BlockUIModule] });
BlockUIHttpModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIHttpModule, imports: [BlockUIModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIHttpModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BlockUIModule]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { BlockUIHttpModule };
//# sourceMappingURL=ng-block-ui-http.mjs.map
