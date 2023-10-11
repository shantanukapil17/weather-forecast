import * as i0 from '@angular/core';
import { Injectable, TemplateRef, ComponentRef, ViewContainerRef, Component, ViewEncapsulation, Input, ViewChild, Directive, InjectionToken, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReplaySubject } from 'rxjs';

const BlockUIDefaultName = 'block-ui-main';

class BlockUIActions {
}
BlockUIActions.START = 'start';
BlockUIActions.STOP = 'stop';
BlockUIActions.UPDATE = 'update';
BlockUIActions.RESET = 'reset';
BlockUIActions.RESET_GLOBAL = 'reset_global';
BlockUIActions.UNSUBSCRIBE = 'unsubscribe';

class BlockUIInstanceService {
    constructor() {
        this.blockUISettings = {};
        this.blockUIInstances = {};
        this.blockUISubject = new ReplaySubject(1);
        this.blockUIObservable = this.blockUISubject.asObservable();
        this.blockUIObservable.subscribe(this.blockUIMiddleware.bind(this));
    }
    getSettings() {
        return this.blockUISettings;
    }
    updateSettings(settings = {}) {
        this.blockUISettings = { ...this.blockUISettings, ...settings };
    }
    decorate(name = BlockUIDefaultName) {
        const blockUI = {
            name,
            isActive: false,
            blockCount: 0,
            start: this.dispatch(this.blockUISubject, BlockUIActions.START, name),
            update: this.dispatch(this.blockUISubject, BlockUIActions.UPDATE, name),
            stop: this.dispatch(this.blockUISubject, BlockUIActions.STOP, name),
            reset: this.dispatch(this.blockUISubject, BlockUIActions.RESET, name),
            resetGlobal: this.dispatch(this.blockUISubject, BlockUIActions.RESET_GLOBAL, name),
            unsubscribe: this.dispatch(this.blockUISubject, BlockUIActions.UNSUBSCRIBE, name)
        };
        this.blockUIInstances[name] = this.blockUIInstances[name] || blockUI;
        return blockUI;
    }
    observe() {
        return this.blockUIObservable;
    }
    clearInstance(instanceName) {
        this.dispatch(this.blockUISubject, BlockUIActions.RESET, instanceName);
    }
    blockUIMiddleware({ action, name }) {
        let isActive = null;
        switch (action) {
            case (BlockUIActions.START):
                isActive = true;
                break;
            case (BlockUIActions.STOP):
            case (BlockUIActions.RESET):
                isActive = false;
                break;
        }
        if (isActive !== null) {
            this.blockUIInstances[name].isActive = isActive;
        }
    }
    dispatch(subject, action, name = BlockUIDefaultName) {
        return (message) => {
            subject.next({
                name,
                action,
                message
            });
        };
    }
}
BlockUIInstanceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIInstanceService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BlockUIInstanceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIInstanceService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIInstanceService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

// Spinner style - https://github.com/lukehaas/css-loaders
const styles = `
.block-ui-wrapper {
  display: none;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.70);
  z-index: 30000;
  cursor: wait;
}

.block-ui-wrapper.block-ui-wrapper--element {
  position: absolute;
}

.block-ui-wrapper.active {
  display: block;
}

.block-ui-wrapper.block-ui-main {
  position: fixed;
}

.block-ui-spinner,
.block-ui-template {
  position: absolute;
  top: 40%;
  margin: 0 auto;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.block-ui-spinner > .message {
  font-size: 1.3em;
  text-align: center;
  color: #fff;
}

.block-ui__element {
  position: relative;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 7px auto;
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;

const template = `
<div class="block-ui-wrapper {{name}} {{className}}" [ngClass]="{ 'active': state.blockCount > 0 }">
  <div class="block-ui-spinner" *ngIf="!templateCmp">
    <div class="loader"></div>
    <div *ngIf="message || defaultMessage" class="message">
      {{ message || defaultMessage }}
    </div>
  </div>
  <ng-template *ngIf="templateCmp" #templateOutlet></ng-template>
</div>
`;

class BlockUIContentComponent {
    constructor(blockUI, resolver, changeDetectionRef) {
        this.blockUI = blockUI;
        this.resolver = resolver;
        this.changeDetectionRef = changeDetectionRef;
        this.name = BlockUIDefaultName;
        this.defaultBlockState = {
            startTimeouts: [],
            stopTimeouts: [],
            updateTimeouts: [],
            blockCount: 0,
            startCallCount: 0,
            stopCallCount: 0
        };
        this.state = { ...this.defaultBlockState };
    }
    ngOnInit() {
        this.settings = this.blockUI.getSettings();
        this.blockUISubscription = this.subscribeToBlockUI(this.blockUI.observe());
    }
    ngAfterViewInit() {
        try {
            if (!this.templateCmp) {
                return false;
            }
            if (this.templateCmp instanceof TemplateRef) {
                this.templateOutlet.createEmbeddedView(this.templateCmp);
            }
            else {
                const templateComp = this.resolver.resolveComponentFactory(this.templateCmp);
                this.templateCompRef = this.templateOutlet.createComponent(templateComp);
                this.updateBlockTemplate(this.message);
            }
        }
        catch (error) {
            console.error('ng-block-ui:', error);
        }
    }
    ngAfterViewChecked() {
        this.detectChanges();
    }
    subscribeToBlockUI(blockUI$) {
        return blockUI$.subscribe(event => this.onDispatchedEvent(event));
    }
    onDispatchedEvent(event) {
        switch (event.action) {
            case BlockUIActions.START:
                this.onStart(event);
                break;
            case BlockUIActions.STOP:
                this.onStop(event);
                break;
            case BlockUIActions.UPDATE:
                this.onUpdate(event);
                break;
            case BlockUIActions.RESET:
                this.onReset(event);
                break;
            case BlockUIActions.RESET_GLOBAL:
                this.resetState();
                break;
            case BlockUIActions.UNSUBSCRIBE:
                this.onStop(event);
                this.onUnsubscribe(event.name);
                break;
        }
    }
    onStart({ name, message }) {
        if (name === this.name) {
            const delay = this.delayStart ?? this.settings.delayStart ?? 0;
            this.state.startCallCount += 1;
            const startTimeout = setTimeout(() => {
                this.state.blockCount += 1;
                this.showBlock(message);
                this.updateInstanceBlockCount();
            }, delay);
            this.state.startTimeouts.push(startTimeout);
        }
    }
    onStop({ name }) {
        if (name === this.name) {
            const stopCount = this.state.stopCallCount + 1;
            if (this.state.startCallCount - stopCount >= 0) {
                const delay = this.delayStop ?? this.settings.delayStop ?? 0;
                this.state.stopCallCount = stopCount;
                const stopTimeout = setTimeout(() => {
                    this.state.blockCount -= 1;
                    this.updateInstanceBlockCount();
                    this.detectChanges();
                }, delay);
                this.state.stopTimeouts.push(stopTimeout);
            }
        }
    }
    onUpdate({ name, message }) {
        if (name === this.name) {
            const delay = this.delayStart || this.settings.delayStart || 0;
            clearTimeout(this.state.updateTimeouts[0]);
            const updateTimeout = setTimeout(() => {
                this.updateMessage(message);
            }, delay);
            this.state.updateTimeouts.push(updateTimeout);
        }
    }
    onReset({ name }) {
        if (name === this.name) {
            this.resetState();
        }
    }
    updateMessage(message) {
        this.showBlock(message);
    }
    showBlock(message) {
        this.message = message || this.defaultMessage || this.settings.message;
        this.updateBlockTemplate(this.message);
        this.detectChanges();
    }
    updateBlockTemplate(msg) {
        if (this.templateCompRef && this.templateCompRef instanceof ComponentRef) {
            this.templateCompRef.instance.message = msg;
        }
    }
    resetState() {
        [
            ...this.state.startTimeouts,
            ...this.state.stopTimeouts,
            ...this.state.updateTimeouts
        ].forEach(clearTimeout);
        this.state = { ...this.defaultBlockState };
        this.updateInstanceBlockCount();
        this.detectChanges();
    }
    onUnsubscribe(name) {
        if (this.blockUISubscription && name === this.name) {
            this.blockUISubscription.unsubscribe();
        }
    }
    updateInstanceBlockCount() {
        if (this.blockUI.blockUIInstances[this.name]) {
            const { blockCount } = this.state;
            this.blockUI.blockUIInstances[this.name].blockCount = blockCount;
        }
    }
    detectChanges() {
        if (!this.changeDetectionRef['destroyed']) {
            this.changeDetectionRef.detectChanges();
        }
    }
    ngOnDestroy() {
        this.resetState();
        this.onUnsubscribe(this.name);
        this.blockUI.clearInstance(this.name);
    }
}
BlockUIContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIContentComponent, deps: [{ token: BlockUIInstanceService }, { token: i0.ComponentFactoryResolver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
BlockUIContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: BlockUIContentComponent, selector: "block-ui-content", inputs: { name: "name", delayStart: "delayStart", delayStop: "delayStop", defaultMessage: ["message", "defaultMessage"], templateCmp: ["template", "templateCmp"] }, viewQueries: [{ propertyName: "templateOutlet", first: true, predicate: ["templateOutlet"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "\n<div class=\"block-ui-wrapper {{name}} {{className}}\" [ngClass]=\"{ 'active': state.blockCount > 0 }\">\n  <div class=\"block-ui-spinner\" *ngIf=\"!templateCmp\">\n    <div class=\"loader\"></div>\n    <div *ngIf=\"message || defaultMessage\" class=\"message\">\n      {{ message || defaultMessage }}\n    </div>\n  </div>\n  <ng-template *ngIf=\"templateCmp\" #templateOutlet></ng-template>\n</div>\n", isInline: true, styles: [".block-ui-wrapper{display:none;position:fixed;height:100%;width:100%;top:0;left:0;background:rgba(0,0,0,.7);z-index:30000;cursor:wait}.block-ui-wrapper.block-ui-wrapper--element{position:absolute}.block-ui-wrapper.active{display:block}.block-ui-wrapper.block-ui-main{position:fixed}.block-ui-spinner,.block-ui-template{position:absolute;top:40%;margin:0 auto;left:0;right:0;transform:translateY(-50%)}.block-ui-spinner>.message{font-size:1.3em;text-align:center;color:#fff}.block-ui__element{position:relative}.loader,.loader:after{border-radius:50%;width:10em;height:10em}.loader{margin:7px auto;font-size:5px;position:relative;text-indent:-9999em;border-top:1.1em solid rgba(255,255,255,.2);border-right:1.1em solid rgba(255,255,255,.2);border-bottom:1.1em solid rgba(255,255,255,.2);border-left:1.1em solid #ffffff;transform:translateZ(0);animation:load8 1.1s infinite linear}@keyframes load8{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'block-ui-content', template: template, encapsulation: ViewEncapsulation.None, styles: [".block-ui-wrapper{display:none;position:fixed;height:100%;width:100%;top:0;left:0;background:rgba(0,0,0,.7);z-index:30000;cursor:wait}.block-ui-wrapper.block-ui-wrapper--element{position:absolute}.block-ui-wrapper.active{display:block}.block-ui-wrapper.block-ui-main{position:fixed}.block-ui-spinner,.block-ui-template{position:absolute;top:40%;margin:0 auto;left:0;right:0;transform:translateY(-50%)}.block-ui-spinner>.message{font-size:1.3em;text-align:center;color:#fff}.block-ui__element{position:relative}.loader,.loader:after{border-radius:50%;width:10em;height:10em}.loader{margin:7px auto;font-size:5px;position:relative;text-indent:-9999em;border-top:1.1em solid rgba(255,255,255,.2);border-right:1.1em solid rgba(255,255,255,.2);border-bottom:1.1em solid rgba(255,255,255,.2);border-left:1.1em solid #ffffff;transform:translateZ(0);animation:load8 1.1s infinite linear}@keyframes load8{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], ctorParameters: function () { return [{ type: BlockUIInstanceService }, { type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { name: [{
                type: Input
            }], delayStart: [{
                type: Input
            }], delayStop: [{
                type: Input
            }], defaultMessage: [{
                type: Input,
                args: ['message']
            }], templateCmp: [{
                type: Input,
                args: ['template']
            }], templateOutlet: [{
                type: ViewChild,
                args: ['templateOutlet', { read: ViewContainerRef }]
            }] } });

class BlockUIComponent {
    constructor(blockUI) {
        this.blockUI = blockUI;
    }
    ngOnInit() {
        this.name = this.name || BlockUIDefaultName;
        this.template = this.template || this.blockUI.blockUISettings.template;
    }
}
BlockUIComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIComponent, deps: [{ token: BlockUIInstanceService }], target: i0.ɵɵFactoryTarget.Component });
BlockUIComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: BlockUIComponent, selector: "block-ui", inputs: { name: "name", message: "message", delayStart: "delayStart", delayStop: "delayStop", template: "template" }, ngImport: i0, template: `
    <ng-content></ng-content>
    <block-ui-content
      [name]="name"
      [message]="message"
      [template]="template"
      [delayStart]="delayStart"
      [delayStop]="delayStop"
    >
    </block-ui-content>
  `, isInline: true, dependencies: [{ kind: "component", type: BlockUIContentComponent, selector: "block-ui-content", inputs: ["name", "delayStart", "delayStop", "message", "template"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'block-ui',
                    template: `
    <ng-content></ng-content>
    <block-ui-content
      [name]="name"
      [message]="message"
      [template]="template"
      [delayStart]="delayStart"
      [delayStop]="delayStop"
    >
    </block-ui-content>
  `,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: BlockUIInstanceService }]; }, propDecorators: { name: [{
                type: Input
            }], message: [{
                type: Input
            }], delayStart: [{
                type: Input
            }], delayStop: [{
                type: Input
            }], template: [{
                type: Input
            }] } });

class BlockUIService {
    constructor(blockUIInstance) {
        this.blockUIInstance = blockUIInstance;
        this.globalDispatch = this.blockUIInstance.decorate();
    }
    /**
    * Starts blocking for given BlockUI instance or instances
    */
    start(target, message) {
        this.dispatch(target, BlockUIActions.START, message);
    }
    /**
    * Stops blocking for given BlockUI instance or instances
    */
    stop(target) {
        this.dispatch(target, BlockUIActions.STOP);
    }
    /**
    * Reset blocking for given BlockUI instance or instances
    */
    reset(target) {
        this.dispatch(target, BlockUIActions.RESET);
    }
    /**
    * Reset blocking for all BlockUI instances
    */
    resetGlobal() {
        this.globalDispatch.resetGlobal();
    }
    /**
    * Updates message for given BlockUI instance or instances
    */
    update(target, message) {
        this.dispatch(target, BlockUIActions.UPDATE, message);
    }
    /**
    * Unsubscribes for given BlockUI instance or instances
    */
    unsubscribe(target) {
        this.dispatch(target, BlockUIActions.UNSUBSCRIBE);
    }
    /**
    * Checks if BlockUI is actively blocking
    */
    isActive(target = null) {
        const targets = target ? this.toArray(target) : null;
        const instances = this.blockUIInstance.blockUIInstances;
        return Object.keys(instances).some((key) => {
            if (!targets) {
                return instances[key].isActive;
            }
            return targets.indexOf(instances[key].name) >= 0 && instances[key].isActive;
        });
    }
    dispatch(target = [], type, message) {
        const instances = this.toArray(target);
        instances.forEach(i => this.blockUIInstance.decorate(i)[type](message));
    }
    toArray(target = []) {
        return typeof target === 'string' ? [target] : target;
    }
}
BlockUIService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIService, deps: [{ token: BlockUIInstanceService }], target: i0.ɵɵFactoryTarget.Injectable });
BlockUIService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: BlockUIInstanceService }]; } });

class BlockUIDirective {
    constructor(blockUIService, blockUIInstanceService, viewRef, templateRef, renderer, componentFactoryResolver) {
        this.blockUIService = blockUIService;
        this.blockUIInstanceService = blockUIInstanceService;
        this.viewRef = viewRef;
        this.templateRef = templateRef;
        this.renderer = renderer;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    set blockUI(name) { this.blockTarget = name; }
    ;
    set blockUIMessage(message) { this.message = message; }
    ;
    set blockUITemplate(template) { this.template = template; }
    ;
    set blockUIDelayStart(delayStart) {
        this.delayStart = delayStart ? Number(delayStart) : null;
    }
    ;
    set blockUIDelayStop(delayStop) {
        this.delayStop = delayStop ? Number(delayStop) : null;
    }
    ;
    ngOnInit() {
        try {
            this.viewRef.createEmbeddedView(this.templateRef);
            const parentElement = this.getParentElement();
            if (parentElement && !this.isComponentInTemplate(parentElement)) {
                this.renderer.addClass(parentElement, 'block-ui__element');
                this.blockUIComponentRef = this.createComponent();
                let blockUIContent = this.findContentNode(this.viewRef.element.nativeElement);
                if (blockUIContent) {
                    const settings = this.blockUIInstanceService.getSettings();
                    parentElement.appendChild(blockUIContent);
                    this.blockUIComponentRef.instance.className = 'block-ui-wrapper--element';
                    this.blockUIComponentRef.instance.name = this.blockTarget || BlockUIDefaultName;
                    if (this.message)
                        this.blockUIComponentRef.instance.defaultMessage = this.message;
                    if (this.delayStart)
                        this.blockUIComponentRef.instance.delayStart = this.delayStart;
                    if (this.delayStop)
                        this.blockUIComponentRef.instance.delayStop = this.delayStop;
                    if (this.template || settings.template)
                        this.blockUIComponentRef.instance.templateCmp = this.template || settings.template;
                }
            }
        }
        catch (error) {
            console.error('ng-block-ui:', error);
        }
    }
    isComponentInTemplate(element) {
        // Needed because of https://github.com/microsoft/TypeScript/issues/26235
        const targetElement = element || {};
        let { children } = targetElement;
        children = Array.from(children || []).reverse();
        return children.some((el) => el && el.localName === 'block-ui');
    }
    getParentElement() {
        const embeddedView = this.viewRef.get(0);
        return embeddedView.rootNodes[0];
    }
    // Needed for IE (#17)
    findContentNode(element) {
        const nextSibling = element.nextSibling || {};
        const previousSibling = element.previousSibling || {};
        return [
            nextSibling,
            nextSibling.nextSibling,
            previousSibling,
            previousSibling.previousSibling
        ].find((e) => e && e.localName === 'block-ui-content');
    }
    createComponent() {
        const resolvedBlockUIComponent = this.componentFactoryResolver.resolveComponentFactory(BlockUIContentComponent);
        return this.viewRef.createComponent(resolvedBlockUIComponent);
    }
    ngOnDestroy() {
        if (this.blockTarget) {
            this.blockUIService.reset(this.blockTarget);
        }
    }
}
BlockUIDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIDirective, deps: [{ token: BlockUIService }, { token: BlockUIInstanceService }, { token: i0.ViewContainerRef }, { token: i0.TemplateRef }, { token: i0.Renderer2 }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Directive });
BlockUIDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.3.0", type: BlockUIDirective, selector: "[blockUI]", inputs: { blockUI: "blockUI", blockUIMessage: "blockUIMessage", blockUITemplate: "blockUITemplate", blockUIDelayStart: "blockUIDelayStart", blockUIDelayStop: "blockUIDelayStop" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[blockUI]' }]
        }], ctorParameters: function () { return [{ type: BlockUIService }, { type: BlockUIInstanceService }, { type: i0.ViewContainerRef }, { type: i0.TemplateRef }, { type: i0.Renderer2 }, { type: i0.ComponentFactoryResolver }]; }, propDecorators: { blockUI: [{
                type: Input
            }], blockUIMessage: [{
                type: Input
            }], blockUITemplate: [{
                type: Input
            }], blockUIDelayStart: [{
                type: Input
            }], blockUIDelayStop: [{
                type: Input
            }] } });

const BlockUIServiceInstance = new BlockUIInstanceService();
// Needed for AOT compiling
const BlockUIModuleSettings = new InjectionToken('BlockUIModuleSettings');
function provideInstance(settings) {
    BlockUIServiceInstance.updateSettings(settings);
    return BlockUIServiceInstance;
}
class BlockUIModule {
    static forRoot(settings = {}) {
        return {
            ngModule: BlockUIModule,
            providers: [
                {
                    provide: BlockUIModuleSettings,
                    useValue: settings
                },
                {
                    provide: BlockUIInstanceService,
                    useFactory: provideInstance,
                    deps: [BlockUIModuleSettings]
                },
                BlockUIService
            ]
        };
    }
}
BlockUIModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BlockUIModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: BlockUIModule, declarations: [BlockUIComponent,
        BlockUIDirective,
        BlockUIContentComponent], imports: [CommonModule], exports: [BlockUIComponent,
        BlockUIDirective,
        BlockUIContentComponent] });
BlockUIModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: BlockUIModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    entryComponents: [
                        BlockUIComponent,
                        BlockUIContentComponent
                    ],
                    declarations: [
                        BlockUIComponent,
                        BlockUIDirective,
                        BlockUIContentComponent
                    ],
                    exports: [
                        BlockUIComponent,
                        BlockUIDirective,
                        BlockUIContentComponent
                    ]
                }]
        }] });

let blockInstanceGuid = 1;
function BlockUI(blockName, settings = {}) {
    if (!settings.scopeToInstance) {
        return function (target, propertyKey) {
            target[propertyKey] = BlockUIServiceInstance.decorate(blockName);
        };
    }
    return function (target, key) {
        const secret = `_${key}-block-ui`;
        Object.defineProperty(target, key, {
            get: function () {
                if (this[secret]) {
                    return this[secret];
                }
                const instanceName = `${blockName}-${blockInstanceGuid++}`;
                this[secret] = BlockUIServiceInstance.decorate(instanceName);
                return this[secret];
            },
            set: function (value) {
                this[secret] = value;
            },
        });
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { BlockUIDefaultName as BLOCKUI_DEFAULT, BlockUI, BlockUIComponent, BlockUIContentComponent, BlockUIDirective, BlockUIModule, BlockUIService };
//# sourceMappingURL=ng-block-ui.mjs.map
