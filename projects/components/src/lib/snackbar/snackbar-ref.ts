import {OverlayRef} from '@angular/cdk/overlay';

export class SnackbarRef {
  constructor(readonly overlay: OverlayRef) {}

  closeSnackbar() {
    this.overlay.dispose();
  }

public  isVisible(): boolean {
    return this.overlay && this.overlay.overlayElement;
  }

  getPosition() {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
