import {TestBed} from '@angular/core/testing';
import {Component, Inject} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {SnackbarRef} from './snackbar-ref';
import {defaultSnackbarConfig, SNACKBAR_CONFIG_TOKEN, SnackbarConfig} from './snackbar-config';
import {SnackbarService} from './snackbar.service';
import {SnackbarComponent} from './snackbar.component';

@Component({
  selector: 'ag-test-snackbar',
  template: '<ag-snackbar>test snackbar</ag-snackbar>',
})
class TestSnackbarComponent {
  constructor(
    private snackbarRef: SnackbarRef,
    @Inject(SNACKBAR_CONFIG_TOKEN) private snackbarConfig: SnackbarConfig
  ) {}
}

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackbar: SnackbarRef;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [HostComponentClass, SnackbarComponent],
      providers: [
        SnackbarService,
        Overlay,
        HostComponentClass,
        {provide: SNACKBAR_CONFIG_TOKEN, useValue: {...defaultSnackbarConfig}},
      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [HostComponentClass, SnackbarComponent],
      },
    });
    service = TestBed.get(SnackbarService);
  };

  afterEach(() => {
    snackbar = null;
  });

  describe('render a snackbar', () => {
    beforeEach(() => setupBeforeEachTestWithHostComponent(TestSnackbarComponent));

    it('should create an overlay snackbar', () => {
      snackbar = service.showSnackbar({
        text: `Toast message`,
        theme: 'material',
      });
      const overlay = document.querySelector('.cdk-overlay-container');
      expect(overlay).toBeDefined();
      snackbar.closeSnackbar();
    });
  });
});
