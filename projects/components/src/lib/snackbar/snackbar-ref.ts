import {OverlayRef} from '@angular/cdk/overlay';

export class SnackbarRef {
  constructor(readonly overlay: OverlayRef) {}

  closeSnackbar() {
    this.overlay.dispose();
  }

  getPosition() {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
