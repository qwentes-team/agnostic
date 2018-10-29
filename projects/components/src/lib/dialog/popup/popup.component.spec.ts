import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { Component, DebugElement } from '@angular/core';
import { getChildDebugElement } from '../../../test.shared';

describe('PopupComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let popupDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = (HostComponentClass) => {
    TestBed.configureTestingModule({declarations: [PopupComponent, HostComponentClass]});
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getPopupDebugger = () => getChildDebugElement('ag-popup').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    popupDebugger = null;
  });

  describe('transclude', () => {
    @Component({template: '<ag-popup>Foo</ag-popup>'})
    class TestHostComponent {
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should transclude content', () => {
      hostFixture.detectChanges();
      popupDebugger = getPopupDebugger();
      expect(popupDebugger.nativeElement.innerText).toBe('Foo');
    });
  });
});
