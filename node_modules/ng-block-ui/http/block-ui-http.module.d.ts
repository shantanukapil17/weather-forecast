import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpSettings } from 'ng-block-ui';
import { BlockUIHttpSettings } from './block-ui-http-settings.service';
import * as i0 from "@angular/core";
import * as i1 from "ng-block-ui";
export declare const BlockUIHttpModuleSettings: InjectionToken<string>;
export declare function provideSettingsInstance(settings: HttpSettings): BlockUIHttpSettings;
export declare class BlockUIHttpModule {
    static forRoot(settings?: HttpSettings): ModuleWithProviders<BlockUIHttpModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockUIHttpModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BlockUIHttpModule, never, [typeof i1.BlockUIModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BlockUIHttpModule>;
}
