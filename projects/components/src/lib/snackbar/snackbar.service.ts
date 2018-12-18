import {Inject, Injectable, Injector} from '@angular/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay, PositionStrategy} from '@angular/cdk/overlay';
import {SnackbarComponent} from './snackbar.component';
import {SnackbarModule} from './snackbar.module';
import {SnackbarConfig, SNACKBAR_CONFIG_TOKEN, SNACKBAR_DIRECTIONS, SnackbarPosition} from './snackbar-config';
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

    data.direction = this.setDirection(this.position, this.snackbarConfig.direction);

    const strategy: PositionStrategy = this.createPositionStrategy(data.position, data.direction);

    const overlayRef = this.overlay.create({positionStrategy: strategy});
    const snackbarRef = new SnackbarRef(overlayRef);
    const injector = this.getInjector(data, snackbarRef, this.injector);
    const snackbarPortal = new ComponentPortal(SnackbarComponent, null, injector);
    this.lastSnackbarRef = snackbarRef;
    overlayRef.attach(snackbarPortal);
    return snackbarRef;
  }

  private createPositionStrategy(position, direction): PositionStrategy {
    return this.isPositionStrategy(this.snackbarConfig.position || position)
      ? (position as PositionStrategy)
      : this.positionAdapter(this.position, direction);
  }

  private setDirection(position, defaultDirection): string {
    return position.bottom !== '' ? SNACKBAR_DIRECTIONS.FROM_BOTTOM : defaultDirection;
  }

  private getInjector(data: SnackbarConfig, snackbarRef: SnackbarRef, parentInjector: Injector): PortalInjector {
    const tokens = new WeakMap();
    tokens.set(SnackbarConfig, data);
    tokens.set(SnackbarRef, snackbarRef);
    return new PortalInjector(parentInjector, tokens);
  }

  private isPositionStrategy(position): boolean {
    if (typeof (position as PositionStrategy).dispose === 'function') {
      return Boolean(position as PositionStrategy);
    }
  }

  public positionAdapter(position: SnackbarPosition | PositionStrategy, direction: string): PositionStrategy {
    if (typeof (position as PositionStrategy).dispose === 'function') {
      return position as PositionStrategy;
    }
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

  private isFromTopDirection(direction: string): boolean {
    return direction === SNACKBAR_DIRECTIONS.FROM_TOP;
  }

  private getPositionRef(direction): string {
    const lastSnackbarRefIsVisible = this.lastSnackbarRef && this.lastSnackbarRef.isVisible();

    if (!lastSnackbarRefIsVisible) {
      return this.isFromTopDirection(direction) ? this.position.top + 'px' : this.position.bottom + 'px';
    }

    const isFromTopOffset = this.lastSnackbarRef.getPosition().bottom;
    const isFromBottomOffset = window.innerHeight - this.lastSnackbarRef.getPosition().top;
    const refPositionOffset = this.isFromTopDirection(direction) ? isFromTopOffset : isFromBottomOffset;

    return refPositionOffset + 'px';
  }
}
