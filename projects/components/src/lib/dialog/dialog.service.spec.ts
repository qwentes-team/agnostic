import {TestBed} from '@angular/core/testing';
import {Component, Inject} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {Dialog} from './dialog.model';
import {DIALOG_DATA, DIALOG_REF, DialogService} from './dialog.service';
import {ModalComponent} from './modal/modal.component';
import {PopupComponent} from './popup/popup.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

const MOCK_INJECTION = {REF: [], DATA: [1, 2, 3, 4]};

@Component({
  selector: 'ag-test-dialog',
  template: '<ag-popup>test dialog</ag-popup>',
})
class TestDialogComponent {
  constructor(
    @Inject(DIALOG_REF) private dialogRef: Dialog,
    @Inject(DIALOG_DATA) private dialogData: any
  ) {}
}

// @TODO: fix tests!!!
xdescribe('DialogService', () => {
  let service: DialogService;
  let dialog: Dialog;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [HostComponentClass, ModalComponent, PopupComponent],
      providers: [
        DialogService,
        Overlay,
        HostComponentClass,
        {provide: DIALOG_DATA, useFactory: () => MOCK_INJECTION.DATA},
        {provide: DIALOG_REF, useFactory: () => MOCK_INJECTION.REF},
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [HostComponentClass],
      },
    });
    service = TestBed.get(DialogService);
  };

  afterEach(() => {
    dialog = null;
  });

  describe('render a dialog', () => {
    beforeEach(() => setupBeforeEachTestWithHostComponent(TestDialogComponent));

    it('should create an overlay dialog', done => {
      dialog = service.open(TestDialogComponent);
      const overlay = document.querySelector('.cdk-overlay-container');
      expect(dialog instanceof Dialog).toBeTruthy();
      dialog.afterClosed().subscribe(() => {
        expect(overlay.querySelector('.ag-dialog-content')).toBeFalsy();
        done();
      });
      dialog.close();
    });

    it('should create an overlay dialog with data injection', done => {
      dialog = service.open(TestDialogComponent);
      dialog.afterClosed().subscribe(() => done());
      expect(TestBed.get(TestDialogComponent).dialogData).toEqual(
        MOCK_INJECTION.DATA
      );
      dialog.close();
    });
  });
});
