import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DialogModule } from './dialog.module';
import { Dialog } from './dialog.model';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const DIALOG_REF = new InjectionToken<Dialog>('DIALOG_REF');

export interface DialogConfig extends OverlayConfig {
  data?: any;
  disposeOnClickOut?: boolean;
}

const DEFAULT_CONFIG: DialogConfig = {
  hasBackdrop: true,
  disposeOnNavigation: true,
  disposeOnClickOut: true,
};

@Injectable({
  providedIn: DialogModule
})
export class DialogService {

  constructor(
    private injector: Injector,
    private overlay: Overlay,
  ) {
  }

  public open(component, {data, ...config}: DialogConfig = {}) {
    const overlayConfig = this.createOverlayConfig(config);
    const overlayRef = this.overlay.create(overlayConfig);
    const dialog = new Dialog(overlayRef);
    const componentPortal = this.createComponentPortal(component, data, dialog);
    overlayRef.attach(componentPortal);
    return dialog;
  }

  private createOverlayConfig(config: DialogConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop || DEFAULT_CONFIG.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      disposeOnNavigation: config.disposeOnNavigation || DEFAULT_CONFIG.disposeOnNavigation,
      positionStrategy,
      disposeOnClickOut: config.disposeOnClickOut || DEFAULT_CONFIG.disposeOnClickOut,
    } as OverlayConfig);

    return overlayConfig;
  }

  private createInjector(data: any, dialog: Dialog): PortalInjector {
    const injectionTokens = new WeakMap([
      [DIALOG_DATA, data],
      [DIALOG_REF, dialog],
    ]);
    return new PortalInjector(this.injector, injectionTokens);
  }

  private createComponentPortal(component: any, data: any, dialog: Dialog): ComponentPortal<any> {
    const injector = this.createInjector(data, dialog);
    return new ComponentPortal(component, null, injector);
  }
}
