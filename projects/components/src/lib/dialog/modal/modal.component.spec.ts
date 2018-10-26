import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { Component, DebugElement } from '@angular/core';
import { getChildDebugElement } from '../../../test.shared';

xdescribe('ModalComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let modalDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = (HostComponentClass) => {
    TestBed.configureTestingModule({declarations: [ModalComponent, HostComponentClass]});
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  }

  const getPopupDebugger = () => getChildDebugElement('ag-modal').from(hostFixture);

  afterEach(() => {
    hostFixture && hostFixture.destroy && hostFixture.destroy();
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    modalDebugger = null;
  });

  describe('transclude', () => {
    @Component({template: '<ag-modal>Foo</ag-modal>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should transclude content', () => {
      hostFixture.detectChanges();
      modalDebugger = getPopupDebugger();
      expect(modalDebugger.nativeElement.innerText).toBe('Foo');
    });
  });
});
