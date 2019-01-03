import {OverlayRef} from '@angular/cdk/overlay';

export class SnackbarRef {
  constructor(readonly overlay: OverlayRef) {}

  public closeSnackbar(): void {
    this.overlay.dispose();
  }

  public isVisible(): boolean {
    return Boolean(this.overlay && this.overlay.overlayElement);
  }

  public getPosition(): ClientRect | DOMRect {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
