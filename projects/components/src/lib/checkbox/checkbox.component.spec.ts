import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { Component, DebugElement } from '@angular/core';
import { click, getChildDebugElement } from '../../test.shared';

describe('CheckboxComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let checkboxDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getCheckboxDebugger = () =>
    getChildDebugElement('ag-checkbox').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    checkboxDebugger = null;
  });

  describe('[name]', () => {
    @Component({template: '<ag-checkbox name="nome"></ag-checkbox>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind name', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.name).toBe('nome');
      expect(
        checkboxDebugger.nativeElement.querySelector('.ag-checkbox__input').getAttribute('name')
      ).toBe('nome');
    });
  });

  describe('[value]', () => {
    @Component({template: '<ag-checkbox value="valore"></ag-checkbox>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind value', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.value).toBe('valore');
      expect(
        checkboxDebugger.nativeElement.querySelector('.ag-checkbox__input').getAttribute('value')
      ).toBe('valore');
    });
  });

  describe('[checked]', () => {
    @Component({template: '<ag-checkbox checked="true"></ag-checkbox>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind checked', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.checked).toBe(true);
      expect(checkboxDebugger.nativeElement.querySelector('input').checked).toBe(
        true
      );
    });
  });

  describe('[disabled]', () => {
    @Component({template: '<ag-checkbox disabled="true"></ag-checkbox>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind disabled', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.disabled).toBe(true);
      expect(checkboxDebugger.nativeElement.querySelector('input').disabled).toBe(
        true
      );
    });

    it('should prevent any change', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      click(checkboxDebugger.nativeElement.querySelector('label'));
      hostFixture.detectChanges();
      expect(checkboxDebugger.nativeElement.querySelector('input').disabled).toBe(
        true
      );
      expect(checkboxDebugger.nativeElement.querySelector('input').checked).toBe(
        false
      );
    });
  });

  describe('(change)', () => {
    @Component({
      template:
        '<ag-checkbox name="nome" value="valore" (change)="onChangeCheckbox($event)"></ag-checkbox>',
    })
    class TestHostComponent {
      checkboxEvent: Event;

      onChangeCheckbox(e: Event) {
        this.checkboxEvent = e;
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should emit changes', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      spyOn(hostFixture.componentInstance, 'onChangeCheckbox').and.callThrough();
      click(checkboxDebugger.nativeElement.querySelector('label'));
      expect(hostFixture.componentInstance.onChangeCheckbox).toHaveBeenCalled();
      expect(hostFixture.componentInstance.onChangeCheckbox.calls.count()).toBe(
        1
      );
      expect(hostFixture.componentInstance.checkboxEvent.target).toEqual(
        jasmine.objectContaining({
          name: 'nome',
          value: 'valore',
          checked: true,
        })
      );
    });
  });
});
