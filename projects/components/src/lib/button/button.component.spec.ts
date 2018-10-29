import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonComponent} from './button.component';
import {Component, DebugElement} from '@angular/core';
import {getChildDebugElement} from '../../test.shared';

describe('ButtonComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let buttonDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getButtonDebugger = () =>
    getChildDebugElement('ag-button').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    buttonDebugger = null;
  });

  describe('expand', () => {
    describe('[expand=full]', () => {
      @Component({template: '<ag-button expand="full">Foo</ag-button>'})
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should has expand attribute to full', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        expect(buttonDebugger.nativeElement.getAttribute('expand')).toBe(
          'full'
        );
      });
    });

    describe('[expand=block]', () => {
      @Component({template: '<ag-button expand="block">Foo</ag-button>'})
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should has expand attribute to block', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        expect(buttonDebugger.nativeElement.getAttribute('expand')).toBe(
          'block'
        );
      });
    });
  });

  describe('fill', () => {
    describe('[fill=clear]', () => {
      @Component({template: '<ag-button fill="clear">Foo</ag-button>'})
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should has fill attribute to clear', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        expect(buttonDebugger.nativeElement.getAttribute('fill')).toBe('clear');
      });
    });

    describe('[fill=outline]', () => {
      @Component({template: '<ag-button fill="outline">Foo</ag-button>'})
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should has fill attribute to outline', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        expect(buttonDebugger.nativeElement.getAttribute('fill')).toBe(
          'outline'
        );
      });
    });
  });

  describe('shape', () => {
    describe('[shape=round]', () => {
      @Component({template: '<ag-button shape="round">Foo</ag-button>'})
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should has shape attribute to round', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        expect(buttonDebugger.nativeElement.getAttribute('shape')).toBe(
          'round'
        );
      });
    });
  });

  describe('[disabled]', () => {
    @Component({template: '<ag-button [disabled]="isDisabled">Foo</ag-button>'})
    class TestHostComponent {
      public isDisabled = true;
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should disable button', () => {
      hostFixture.detectChanges();
      buttonDebugger = getButtonDebugger();
      expect(
        window.getComputedStyle(buttonDebugger.nativeElement).pointerEvents
      ).toBe('none');
      hostFixture.componentInstance.isDisabled = false;
      hostFixture.detectChanges();
      expect(
        window.getComputedStyle(buttonDebugger.nativeElement).pointerEvents
      ).toBe('auto');
    });
  });

  describe('transclude', () => {
    describe('default', () => {
      @Component({template: '<ag-button>Foo</ag-button>'})
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude content inside a .ag-button__text element', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        const defaultTransclude = buttonDebugger.nativeElement.querySelector(
          '.ag-button__text'
        );
        expect(defaultTransclude.innerText).toBeTruthy();
      });

      it('should transform content in uppercase', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        const defaultTransclude = buttonDebugger.nativeElement.querySelector(
          '.ag-button__text'
        );
        expect(defaultTransclude.innerText).toBe('FOO');
      });
    });

    describe('[position=before]', () => {
      @Component({
        template:
          '<ag-button><span position="before">bar</span>Foo</ag-button>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude before the .ag-button__text element', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        const defaultTransclude = buttonDebugger.nativeElement.querySelector(
          '.ag-button__text'
        );
        expect(defaultTransclude.previousElementSibling.innerText).toBe('bar');
      });
    });

    describe('[position=after]', () => {
      @Component({
        template: '<ag-button>Foo<span position="after">bar</span></ag-button>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude before the .ag-button__text element', () => {
        hostFixture.detectChanges();
        buttonDebugger = getButtonDebugger();
        const defaultTransclude = buttonDebugger.nativeElement.querySelector(
          '.ag-button__text'
        );
        expect(defaultTransclude.nextElementSibling.innerText).toBe('bar');
      });
    });
  });
});
