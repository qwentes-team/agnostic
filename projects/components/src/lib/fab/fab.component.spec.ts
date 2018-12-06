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

      it('should transclude the default content', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        const defaultTransclude = fabDebugger.nativeElement.querySelector('.ag-fab__icon');
        expect(defaultTransclude.innerText).toBe('TEST');
      });
    });

    describe('[position=before]', () => {
      @Component({
        template: '<ag-fab><span position="before">Test before</span></ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude before the .ag-fab__icon element', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        const defaultTransclude = fabDebugger.nativeElement.querySelector('.ag-fab__icon');
        expect(defaultTransclude.previousElementSibling.innerText).toBe('TEST BEFORE');
      });
    });

    describe('[position=after]', () => {
      @Component({
        template: '<ag-fab><span position="after">Test after</span></ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude after the .ag-fab__icon element', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        const defaultTransclude = fabDebugger.nativeElement.querySelector('.ag-fab__icon');
        expect(defaultTransclude.nextElementSibling.innerText).toBe('TEST AFTER');
      });
    });
  });

  describe('position', () => {
    describe('[position=top-left]', () => {
      @Component({
        template: '<ag-fab position="top-left">Test</ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should display the fab in position top/left on the screen', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        expect(fabDebugger.nativeElement.getAttribute('position')).toBe('top-left');
      });
    });

    describe('[position=top-right]', () => {
      @Component({
        template: '<ag-fab position="top-right">Test</ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should display the fab in position top/right on the screen', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        expect(fabDebugger.nativeElement.getAttribute('position')).toBe('top-right');
      });
    });

    describe('[position=bottom-left]', () => {
      @Component({
        template: '<ag-fab position="bottom-left">Test</ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should display the fab in position bottom/left on the screen', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        expect(fabDebugger.nativeElement.getAttribute('position')).toBe('bottom-left');
      });
    });

    describe('[position=bottom-right]', () => {
      @Component({
        template: '<ag-fab position="bottom-right">Test</ag-fab>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should display the fab in position bottom/right on the screen', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        expect(fabDebugger.nativeElement.getAttribute('position')).toBe('bottom-right');
      });
    });
  });

  describe('fixed', () => {
    describe('[fixed="false"]', () => {
      @Component({
        template: `
          <div style="position: relative; height: 200px">
            <ag-fab fixed="false">Test</ag-fab>
          </div>`,
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should set position: absolute to the ag-fab', () => {
        hostFixture.detectChanges();
        fabDebugger = getFabDebugger();
        expect(fabDebugger.nativeElement.getAttribute('fixed')).toBe('false');
      });
    });
  });
});
