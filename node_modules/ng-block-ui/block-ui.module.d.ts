import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { BlockUIInstanceService } from './services/block-ui-instance.service';
import { BlockUISettings } from './models/block-ui-settings.model';
import * as i0 from "@angular/core";
import * as i1 from "./components/block-ui/block-ui.component";
import * as i2 from "./directives/block-ui.directive";
import * as i3 from "./components/block-ui-content/block-ui-content.component";
import * as i4 from "@angular/common";
export declare const BlockUIServiceInstance: BlockUIInstanceService;
export declare const BlockUIModuleSettings: InjectionToken<string>;
export declare function provideInstance(settings: BlockUISettings): any;
export declare class BlockUIModule {
    static forRoot(settings?: BlockUISettings): ModuleWithProviders<BlockUIModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockUIModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BlockUIModule, [typeof i1.BlockUIComponent, typeof i2.BlockUIDirective, typeof i3.BlockUIContentComponent], [typeof i4.CommonModule], [typeof i1.BlockUIComponent, typeof i2.BlockUIDirective, typeof i3.BlockUIContentComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BlockUIModule>;
}
