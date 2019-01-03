import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {SnackbarRef} from './snackbar-ref';
import {defaultSnackbarConfig, SNACKBAR_CONFIG_TOKEN, SnackbarPosition} from './snackbar-config';
import {SnackbarService} from './snackbar.service';
import {SnackbarComponent} from './snackbar.component';
import {click} from '../../test.shared';

describe('SnackbarService', () => {
  let fixture: ComponentFixture<any>;
  let hostFixture: ComponentFixture<any>;
  let service: SnackbarService;
  let snackbar: SnackbarRef;
  let snackbarComponent: SnackbarComponent;

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
    fixture = TestBed.createComponent(HostComponentClass);
    hostFixture = TestBed.createComponent(HostComponentClass);
    snackbarComponent = TestBed.get(HostComponentClass);
    service = TestBed.get(SnackbarService);
  };

  afterEach(() => {
    snackbar = null;
  });

  describe('render a snackbar', () => {
    @Component({
      selector: 'ag-test-snackbar',
      template: `
        <button #el (click)="openSnackbar()">open snackbar</button>
        <button (click)="openDefaultSnackbar()">open default snackbar</button>
      `,
    })
    class TestSnackbarComponent {
      @ViewChild('el') elRef;

      constructor(public snackbarService: SnackbarService, public overlay: Overlay) {}

      openDefaultSnackbar() {
        return this.snackbarService.showSnackbar({
          text: 'ciao!',
          position: {bottom: 20, right: 20},
        });
      }

      openSnackbar() {
        return this.snackbarService.showSnackbar({
          text: 'ciao!',
          theme: 'material',
          position: this.overlay
            .position()
            .flexibleConnectedTo(this.elRef)
            .withPositions([
              {
                originX: 'center',
                originY: 'center',
                overlayX: 'center',
                overlayY: 'center',
              },
            ]),
        });
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestSnackbarComponent));

    it('should transclude text', () => {
      snackbar = hostFixture.componentInstance.openSnackbar();
      hostFixture.detectChanges();
      const snackbarHTML = document.querySelector('.ag-snackbar__ref');
      expect(snackbarHTML.innerHTML).toContain('ciao!');
      snackbar.closeSnackbar();
    });

    it('should have default theme', () => {
      snackbar = hostFixture.componentInstance.openDefaultSnackbar();
      const snackbarTheme = document.querySelector('.ag-snackbar__ref').getAttribute('theme');
      expect(snackbarTheme).toBeNull();
      snackbar.closeSnackbar();
    });

    it('should change theme', () => {
      snackbar = hostFixture.componentInstance.openSnackbar();
      hostFixture.detectChanges();
      const snackbarTheme = document.querySelector('.ag-snackbar__ref').getAttribute('theme');
      expect(snackbarTheme !== defaultSnackbarConfig.theme).toBeTruthy();
      snackbar.closeSnackbar();
    });

    it('should create an overlay snackbar', () => {
      snackbar = hostFixture.componentInstance.openSnackbar();
      hostFixture.detectChanges();
      const overlay = document.querySelector('.cdk-overlay-container');
      expect(overlay).toBeDefined();
      snackbar.closeSnackbar();
    });

    it('should create a snackbar', () => {
      snackbar = hostFixture.componentInstance.openSnackbar();
      hostFixture.detectChanges();
      expect(snackbar).toBeDefined();
      snackbar.closeSnackbar();
    });

    it('should create multiple snackbar', () => {
      snackbar = hostFixture.componentInstance.openSnackbar();
      snackbar = hostFixture.componentInstance.openSnackbar();
      hostFixture.detectChanges();
      const snackbars = document.querySelectorAll('ag-snackbar');
      expect(snackbars.length).toBe(2);
      snackbars.forEach(s => snackbar.closeSnackbar());
    });

    it('should change snackbar position', () => {
      snackbar = hostFixture.componentInstance.openDefaultSnackbar();
      hostFixture.detectChanges();
      const defaultPosition = (defaultSnackbarConfig.position as SnackbarPosition).bottom;
      const snackbarDOMPosition = document.querySelector('ag-snackbar').getBoundingClientRect().bottom;
      expect(snackbarDOMPosition === defaultPosition).toBeFalsy();
      snackbar.closeSnackbar();
    });

    it('should use custom position strategy', () => {
      snackbar = hostFixture.componentInstance.openSnackbar();
      const defaultPosition = defaultSnackbarConfig.position as SnackbarPosition;
      const newPositionStrategy = snackbar.getPosition();
      hostFixture.detectChanges();
      expect(newPositionStrategy.left === defaultPosition.left).toBeFalsy();
      snackbar.closeSnackbar();
    });

    it('should close snackbar onclick', () => {
      snackbar = hostFixture.componentInstance.openSnackbar();
      hostFixture.detectChanges();
      const snackbarCloseBtn = document.querySelector('.ag-snackbar__action');
      click(snackbarCloseBtn);
      hostFixture.detectChanges();
      const snackbarDOM = document.querySelector('ag-snackbar');
      hostFixture.detectChanges();
      expect(snackbarDOM).toBeNull();
      snackbar.closeSnackbar();
    });
  });
});
