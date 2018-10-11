import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleComponent } from './toggle.component';
import { click, getChildDebugElement } from '../../test.shared';

describe('ToggleComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let toggleDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = (HostComponentClass) => {
    TestBed.configureTestingModule({declarations: [ToggleComponent, HostComponentClass]});
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  }

  const getToggleDebugger = () => getChildDebugElement('ag-toggle').from(hostFixture);

  afterEach(() => {
    hostFixture && hostFixture.destroy && hostFixture.destroy();
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    toggleDebugger = null;
  })

  describe('default values', () => {
    @Component({template: '<ag-toggle></ag-toggle>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should has default [type]', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const childComponent = toggleDebugger.componentInstance;
      const childInput: HTMLElement = toggleDebugger.nativeElement.querySelector('input');
      expect(childComponent.type).toBe('checkbox');
      expect(childInput.getAttribute('type')).toBe('checkbox');
    });

    it('should has default [theme]', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const childComponent = toggleDebugger.componentInstance;
      expect(childComponent.theme).toBe('material');
      expect(toggleDebugger.nativeElement.getAttribute('theme')).toBe('material');
    });

    it('should has default [position]', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const childComponent = toggleDebugger.componentInstance;
      expect(childComponent.position).toBe('before');
      expect(toggleDebugger.nativeElement.getAttribute('position')).toBe('before');
    });
  })

  describe('[name]', () => {
    @Component({template: '<ag-toggle name="foo"></ag-toggle>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding name', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.name).toBe('foo');
      expect(toggleDebugger.nativeElement.querySelector('input').getAttribute('name')).toBe('foo');
    });
  })

  describe('[value]', () => {
    @Component({template: '<ag-toggle value="bar"></ag-toggle>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding value', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.value).toBe('bar');
      expect(toggleDebugger.nativeElement.querySelector('input').value).toBe('bar');
    });
  })

  describe('[checked]', () => {
    @Component({template: '<ag-toggle checked="true"></ag-toggle>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding checked', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.checked).toBe(true);
      expect(toggleDebugger.nativeElement.querySelector('input').checked).toBe(true);
    });
  });

  describe('[disabled]', () => {
    @Component({template: '<ag-toggle disabled="true"></ag-toggle>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding disabled', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.disabled).toBe(true);
      expect(toggleDebugger.nativeElement.querySelector('input').disabled).toBe(true);
    });

    it('should has disabled class', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const toggleElement: HTMLElement = toggleDebugger.nativeElement;
      const toggleContainer: HTMLElement = toggleElement.querySelector('.ag-toggle');
      expect(toggleContainer.classList.contains('ag-toggle--disabled')).toBe(true);
    });

    it('should prevent checked changes', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      click(toggleDebugger.nativeElement.querySelector('label'));
      hostFixture.detectChanges();
      expect(toggleDebugger.nativeElement.querySelector('input').disabled).toBe(true);
      expect(toggleDebugger.nativeElement.querySelector('input').checked).toBe(false);
    });
  });
});
