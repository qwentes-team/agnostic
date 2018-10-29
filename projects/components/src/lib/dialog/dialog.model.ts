import { fromEvent, Observable, Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { take } from 'rxjs/operators';
import { DialogConfig } from './dialog.service';

export class Dialog {

  static CLASS_DIALOG_CONTENT = 'ag-dialog-content';
  static CLASS_DIALOG_CONTENT_SHOWING = 'ag-dialog-content--showing';
  static CLASS_DIALOG_CONTENT_CLOSING = 'ag-dialog-content--closing';
  static CLASS_DIALOG_BACKDROP_SHOWING = 'ag-dialog-backdrop--showing';
  static CLASS_DIALOG_BACKDROP_CLOSING = 'ag-dialog-backdrop--closing';

  private readonly _afterClosed = new Subject<any>();
  private _result;

  constructor(
    private _overlayRef: OverlayRef,
  ) {
    this._onInit();
  }

  private _onInit() {
    this._subscribeOnClose();
    this._shouldDisposeOnClickOut();
    this._onAttachDialog().subscribe(() => {
      this._overlayRef.overlayElement.classList.add(Dialog.CLASS_DIALOG_CONTENT_SHOWING);
      setTimeout(() => {
        this._overlayRef.backdropElement.classList.add(Dialog.CLASS_DIALOG_BACKDROP_SHOWING);
      });
    });
  }

  private _onAttachDialog(): Observable<any> {
    this._overlayRef.overlayElement.classList.add(Dialog.CLASS_DIALOG_CONTENT);
    return this._overlayRef.attachments();
  }

  private _observableTransitionEndOf(element): Observable<any> {
    return fromEvent(element, 'transitionend').pipe(take(1));
  }

  public close(value?: any): void {
    this._result = value;
    this._closeTransition();
  }

  private _closeTransition(): void {
    this._observableTransitionEndOf(this._overlayRef.overlayElement).subscribe(() => this._overlayRef.dispose());
    this._overlayRef.backdropElement.classList.add(Dialog.CLASS_DIALOG_BACKDROP_CLOSING);
    this._overlayRef.overlayElement.classList.add(Dialog.CLASS_DIALOG_CONTENT_CLOSING);
  }

  public afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  public getConfig(): DialogConfig {
    return this._overlayRef.getConfig() as DialogConfig;
  }

  private _shouldDisposeOnClickOut(): void {
    if (this.getConfig().disposeOnClickOut !== false) {
      this._overlayRef.backdropClick().subscribe(() => this.close());
    }
  }

  private _subscribeOnClose() {
    this._overlayRef.detachments()
      .pipe(take(1))
      .subscribe(() => {
        this._afterClosed.next(this._result);
        this._afterClosed.complete();
      });
  }
}
