import {Inject, Injectable, Injector} from '@angular/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay, PositionStrategy} from '@angular/cdk/overlay';
import {SnackbarComponent} from './snackbar.component';
import {SnackbarModule} from './snackbar.module';
import {SnackbarConfig, SNACKBAR_CONFIG_TOKEN, SnackbarPosition, SNACKBAR_DIRECTIONS} from './snackbar-config';
import {SnackbarRef} from './snackbar-ref';

@Injectable({
  providedIn: SnackbarModule,
})
export class SnackbarService {
  private lastSnackbarRef: SnackbarRef;
  private position: any;

  constructor(
    private injector: Injector,
    private overlay: Overlay,
    @Inject(SNACKBAR_CONFIG_TOKEN) private snackbarConfig: SnackbarConfig
  ) {}

  public showSnackbar(data: SnackbarConfig) {
    this.position = {...this.snackbarConfig.position, ...data.position};
    const overlayRef = this.overlay.create({positionStrategy: this.positionAdapter(this.position, data.direction)});
    const snackbarRef = new SnackbarRef(overlayRef);
    const injector = this.getInjector(data, snackbarRef, this.injector);
    const snackbarPortal = new ComponentPortal(SnackbarComponent, null, injector);
    this.lastSnackbarRef = snackbarRef;
    overlayRef.attach(snackbarPortal);
    return snackbarRef;
  }

  private getInjector(data: SnackbarConfig, snackbarRef: SnackbarRef, parentInjector: Injector): PortalInjector {
    const tokens = new WeakMap();
    tokens.set(SnackbarConfig, data);
    tokens.set(SnackbarRef, snackbarRef);
    return new PortalInjector(parentInjector, tokens);
  }

  private isPositionStrategy(position) {
    if (typeof (position as PositionStrategy).dispose === 'function') {
      return position as PositionStrategy;
    }
  }

  public positionAdapter(position: SnackbarPosition | PositionStrategy, direction: string): PositionStrategy {
    this.isPositionStrategy(position);
    const global = this.overlay.position().global();
    if ((position as SnackbarPosition).top) {
      global.top(this.getPositionRef(direction));
    }
    if ((position as SnackbarPosition).bottom) {
      global.bottom(this.getPositionRef(direction));
    }
    if ((position as SnackbarPosition).left) {
      global.left(this.setPositionValue((position as SnackbarPosition).left));
    }
    if ((position as SnackbarPosition).right) {
      global.right(this.setPositionValue((position as SnackbarPosition).right));
    }
    return global as PositionStrategy;
  }

  private setPositionValue(value): string {
    return typeof value === 'number' ? value + 'px' : value;
  }

  private getPositionRef(direction = SNACKBAR_DIRECTIONS.FROM_TOP): string {
    const lastSnackbarRefIsVisible = this.lastSnackbarRef && this.lastSnackbarRef.isVisible();

    if (!lastSnackbarRefIsVisible) {
      return direction === SNACKBAR_DIRECTIONS.FROM_TOP ? this.position.top + 'px' : this.position.bottom + 'px';
    }

    const isFromTopOffset = this.lastSnackbarRef.getPosition().bottom;
    const isFromBottomOffset = window.innerHeight - this.lastSnackbarRef.getPosition().top;
    const refPositionOffset = direction === SNACKBAR_DIRECTIONS.FROM_TOP ? isFromTopOffset : isFromBottomOffset;

    return refPositionOffset + 'px';
  }
}
