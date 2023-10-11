import { OnInit } from '@angular/core';
import { BlockUIInstanceService } from '../../services/block-ui-instance.service';
import * as i0 from "@angular/core";
export declare class BlockUIComponent implements OnInit {
    private blockUI;
    name: string;
    message: any;
    delayStart: number;
    delayStop: number;
    template: any;
    constructor(blockUI: BlockUIInstanceService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockUIComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BlockUIComponent, "block-ui", never, { "name": "name"; "message": "message"; "delayStart": "delayStart"; "delayStop": "delayStop"; "template": "template"; }, {}, never, ["*"], false>;
}
