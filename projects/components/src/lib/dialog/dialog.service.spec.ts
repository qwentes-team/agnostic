import { async, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Component, Inject } from '@angular/core';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { Dialog } from './dialog.model';
import { DIALOG_DATA, DIALOG_REF, DialogService } from './dialog.service';
import { ModalComponent } from './modal/modal.component';
import { PopupComponent } from './popup/popup.component';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ComponentPortal } from '@angular/cdk/portal';

const MOCK_INJECTION = {
  REF: [],
  DATA: [1, 2, 3, 4],
}

@Component({selector: 'test-dialog', template: 'test dialog'})
class TestDialogComponent {
  constructor(
    @Inject(DIALOG_REF) private dialogRef: Dialog,
    @Inject(DIALOG_DATA) private dialogData: any,
  ) {
  }
}

describe('DialogService', () => {
  let service: DialogService;
  let dialog: Dialog;
  let hostFixture;
  let hostComponent;
  let hostElement;

  const setupBeforeEachTestWithHostComponent = (HostComponentClass) => {
    TestBed.configureTestingModule({
      declarations: [HostComponentClass, ModalComponent, PopupComponent],
      providers: [
        DialogService,
        Overlay,
        HostComponentClass,
        {provide: DIALOG_DATA, useFactory: () => MOCK_INJECTION.DATA},
        {provide: DIALOG_REF, useFactory: () => MOCK_INJECTION.REF}
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [HostComponentClass],
      }
    });
    service = TestBed.get(DialogService);
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  }

  afterEach(() => {
    hostFixture && hostFixture.nativeElement && hostFixture.nativeElement.remove();
    hostFixture && hostFixture.destroy && hostFixture.destroy();
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    dialog = null;
  });

  describe('render a dialog', () => {
    beforeEach(() => setupBeforeEachTestWithHostComponent(TestDialogComponent));

    it('should create an overlay dialog', (done) => {
      dialog = service.open(TestDialogComponent);
      const overlay = document.querySelector('.cdk-overlay-container');
      expect(dialog instanceof Dialog).toBeTruthy();
      hostFixture.detectChanges();
      dialog.afterClosed().subscribe(() => {
        hostFixture.detectChanges();
        expect(overlay.querySelector('.ag-dialog-content')).toBeFalsy();
        done();
      });
      dialog.close();
    });

    it('should create an overlay dialog with data injection', (done) => {
      dialog = service.open(TestDialogComponent);
      dialog.afterClosed().subscribe(() => done());
      expect(TestBed.get(TestDialogComponent).dialogData).toEqual(MOCK_INJECTION.DATA);
      dialog.close();
    });
  });
});
