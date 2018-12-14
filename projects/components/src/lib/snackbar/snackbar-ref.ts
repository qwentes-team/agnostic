import {OverlayRef} from '@angular/cdk/overlay';

export class SnackbarRef {
  constructor(readonly overlay: OverlayRef) {}

  closeSnackbar() {
    this.overlay.dispose();
  }

  isVisible() {
    return this.overlay && this.overlay.overlayElement;
  }

  getPosition() {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
