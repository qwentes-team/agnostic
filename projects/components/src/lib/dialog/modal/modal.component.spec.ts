import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalComponent, ModalContentComponent, ModalHeaderComponent} from './modal.component';
import {Component, DebugElement} from '@angular/core';
import {getChildDebugElement} from '../../../test.shared';

describe('ModalComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let modalDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent, ModalHeaderComponent, ModalContentComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getModalDebugger = () => getChildDebugElement('ag-modal').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    modalDebugger = null;
  });

  describe('transclude', () => {
    describe('should transclude all content', () => {
      @Component({
        template:
          '<ag-modal><ag-modal-header>header</ag-modal-header><ag-modal-content>content</ag-modal-content></ag-modal>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude all content', () => {
        hostFixture.detectChanges();
        modalDebugger = getModalDebugger();
        expect(modalDebugger.nativeElement.children.length).toBe(2);
        expect(modalDebugger.nativeElement.children[0].innerText).toBe('header');
        expect(modalDebugger.nativeElement.children[0].tagName).toBe('ag-modal-header'.toUpperCase());
        expect(modalDebugger.nativeElement.children[1].innerText).toBe('content');
        expect(modalDebugger.nativeElement.children[1].tagName).toBe('ag-modal-content'.toUpperCase());
      });
    });

    describe('should transclude only header', () => {
      @Component({
        template: '<ag-modal><ag-modal-header>header</ag-modal-header></ag-modal>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude all content', () => {
        hostFixture.detectChanges();
        modalDebugger = getModalDebugger();
        expect(modalDebugger.nativeElement.children.length).toBe(1);
        expect(modalDebugger.nativeElement.children[0].innerText).toBe('header');
        expect(modalDebugger.nativeElement.children[0].tagName).toBe('ag-modal-header'.toUpperCase());
      });
    });

    describe('should transclude only content', () => {
      @Component({
        template: '<ag-modal><ag-modal-content>content</ag-modal-content></ag-modal>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude all content', () => {
        hostFixture.detectChanges();
        modalDebugger = getModalDebugger();
        expect(modalDebugger.nativeElement.children.length).toBe(1);
        expect(modalDebugger.nativeElement.children[0].innerText).toBe('content');
        expect(modalDebugger.nativeElement.children[0].tagName).toBe('ag-modal-content'.toUpperCase());
      });
    });
  });
});
