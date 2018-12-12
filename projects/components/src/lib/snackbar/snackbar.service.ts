import {Injectable, Injector} from '@angular/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay} from '@angular/cdk/overlay';
import {SnackbarComponent} from './snackbar.component';
import {SnackbarModule} from './snackbar.module';
import {SNACKBAR_DATA, SnackbarData} from './snackbar.injection';
import {SnackbarRef} from './snackbar-ref';

@Injectable({
  providedIn: SnackbarModule,
})
export class SnackbarService {
  private lastSnackbar: any;

  constructor(private injector: Injector, private overlay: Overlay) {}

  public showSnackbar(data: SnackbarData) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .right()
      .top(this.getPosition());
    const overlayRef = this.overlay.create({positionStrategy});

    const snackbarRef = new SnackbarRef(overlayRef);
    this.lastSnackbar = snackbarRef;
    const injector = this.getInjector(data, snackbarRef, this.injector);

    const snackbarPortal = new ComponentPortal(SnackbarComponent, null, injector);
    overlayRef.attach(snackbarPortal);

    return snackbarRef;
  }

  private getInjector(data: SnackbarData, snackbarRef: SnackbarRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(SNACKBAR_DATA, data);
    tokens.set(SnackbarRef, snackbarRef);

    return new PortalInjector(parentInjector, tokens);
  }

  getPosition() {
    const position = this.lastSnackbar ? this.lastSnackbar.getPosition().bottom : 0;
    return position + 'px';
  }
}
