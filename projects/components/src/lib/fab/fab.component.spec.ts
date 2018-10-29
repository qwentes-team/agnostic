import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FabComponent} from './fab.component';
import {Component, DebugElement} from '@angular/core';
import {getChildDebugElement} from '../../test.shared';

describe('FabComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let fabDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [FabComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getFabDebugger = () => getChildDebugElement('ag-fab').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    fabDebugger = null;
  });

  describe('transclude', () => {
    describe('default', () => {
      @Component({
        template: '<ag-fab>Test</ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      fit('should transclude the default content', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        const defaultTransclude = fabDebugger.nativeElement.querySelector(
          '.ag-fab__icon'
        );
        expect(defaultTransclude.innerText).toBe('TEST');
      });
    });

    describe('[position=before]', () => {
      @Component({
        template: '<ag-fab><span position="before">Test before</span></ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      fit('should transclude before the .ag-fab__icon element', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        const defaultTransclude = fabDebugger.nativeElement.querySelector(
          '.ag-fab__icon'
        );
        expect(defaultTransclude.previousElementSibling.innerText).toBe(
          'TEST BEFORE'
        );
      });
    });

    describe('[position=after]', () => {
      @Component({
        template: '<ag-fab><span position="after">Test after</span></ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      fit('should transclude after the .ag-fab__icon element', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        const defaultTransclude = fabDebugger.nativeElement.querySelector(
          '.ag-fab__icon'
        );
        expect(defaultTransclude.nextElementSibling.innerText).toBe(
          'TEST AFTER'
        );
      });
    });
  });

  describe('position', () => {});
});
