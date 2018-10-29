import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {ChipComponent} from './chip.component';
import {getChildDebugElement} from '../../test.shared';

describe('ChipComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let chipDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [ChipComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getChipDebugger = () =>
    getChildDebugElement('ag-chip').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    chipDebugger = null;
  });

  describe('transclude', () => {
    describe('[position=before]', () => {
      @Component({
        template:
          '<ag-chip><span position="before">icon</span>Content</ag-chip>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude before the .ag-chip__text element', () => {
        hostFixture.detectChanges();
        chipDebugger = getChipDebugger();
        const defaultTransclude = chipDebugger.nativeElement.querySelector(
          '.ag-chip__text'
        );
        expect(defaultTransclude.previousElementSibling.innerText).toBe('icon');
      });
    });

    describe('[position=after]', () => {
      @Component({
        template:
          '<ag-chip>Content<span position="after">icon</span></ag-chip>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude before the .ag-chip__text element', () => {
        hostFixture.detectChanges();
        chipDebugger = getChipDebugger();
        const defaultTransclude = chipDebugger.nativeElement.querySelector(
          '.ag-chip__text'
        );
        expect(defaultTransclude.nextElementSibling.innerText).toBe('icon');
      });
    });
  });
});
