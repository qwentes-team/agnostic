import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {AccordionComponent} from './accordion.component';
import {click, getChildDebugElement} from '../../test.shared';

const SELECTOR = {
  CONTAINER: '.ag-accordion',
  TRIGGER: '.ag-accordion__trigger',
  CONTENT: '.ag-accordion__content',
  DISABLED: '.ag-accordion--disabled',
  OPEN: '.ag-accordion--open',
};

describe('AccordionComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let accordionDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [AccordionComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getAccordionDebugger = () => getChildDebugElement('ag-accordion').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    accordionDebugger = null;
  });

  describe('Default accordion', () => {
    @Component({
      template: `
        <ag-accordion
          label="My label"
          [disabled]="isDisabled"
          [isOpen]="isOpen"
          (open)="onEvent($event)"
          (close)="onEvent($event)"
          (change)="onEvent($event)"
        >
          <div>My super content</div>
        </ag-accordion>
      `,
    })
    class TestHostComponent {
      isDisabled = false;
      isOpen = false;

      onEvent(event) {}
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should toggle content', () => {
      hostFixture.detectChanges();
      accordionDebugger = getAccordionDebugger();
      const accordionDOM = accordionDebugger.nativeElement;
      const triggerDOM = accordionDOM.querySelector(SELECTOR.TRIGGER);
      const accordionContainerDOM = accordionDOM.querySelector(SELECTOR.CONTAINER);
      expect(accordionDOM.querySelector(SELECTOR.CONTENT)).toBeNull();
      click(triggerDOM);
      expect(accordionDOM.querySelector(SELECTOR.CONTENT).innerHTML).toBe('<div>My super content</div>');
      expect(accordionContainerDOM.classList.contains(SELECTOR.OPEN.split('.')[1])).toBe(true);
      click(triggerDOM);
      expect(accordionDOM.querySelector(SELECTOR.CONTENT)).toBeNull();
    });

    it('should be open on init', () => {
      hostFixture.componentInstance.isOpen = true;
      hostFixture.detectChanges();
      accordionDebugger = getAccordionDebugger();
      const accordionDOM = accordionDebugger.nativeElement;
      expect(accordionDOM.querySelector(SELECTOR.CONTENT).innerHTML).toBe('<div>My super content</div>');
    });

    it('should be disabled', () => {
      hostFixture.componentInstance.isDisabled = true;
      hostFixture.detectChanges();
      accordionDebugger = getAccordionDebugger();
      const accordionDOM = accordionDebugger.nativeElement;
      const triggerDOM = accordionDOM.querySelector(SELECTOR.TRIGGER);
      const accordionContainerDOM = accordionDOM.querySelector(SELECTOR.CONTAINER);
      expect(accordionDOM.querySelector(SELECTOR.CONTENT)).toBeNull();
      click(triggerDOM);
      expect(accordionDOM.querySelector(SELECTOR.CONTENT)).toBeNull();
      expect(accordionContainerDOM.classList.contains(SELECTOR.DISABLED.split('.')[1])).toBe(true);
    });

    it('should emit events', () => {
      const spy = spyOn(hostFixture.componentInstance, 'onEvent');
      hostFixture.detectChanges();
      accordionDebugger = getAccordionDebugger();
      const accordionDOM = accordionDebugger.nativeElement;
      const triggerDOM = accordionDOM.querySelector(SELECTOR.TRIGGER);
      click(triggerDOM);
      const openCalls = spy.calls.all();
      expect(openCalls[0].args[0]).toEqual({type: 'open'});
      expect(openCalls[1].args[0]).toEqual({type: 'change'});
      click(triggerDOM);
      const closedCalls = spy.calls.all();
      expect(closedCalls[2].args[0]).toEqual({type: 'close'});
      expect(closedCalls[3].args[0]).toEqual({type: 'change'});
      spy.and.callThrough();
    });
  });
});
