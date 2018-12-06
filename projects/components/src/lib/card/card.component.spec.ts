import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {CardComponent} from './card.component';
import {getChildDebugElement} from '../../test.shared';

describe('CardComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let cardDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [CardComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getCardDebugger = () =>
    getChildDebugElement('ag-card').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    cardDebugger = null;
  });

  describe('transclude', () => {
    describe('content', () => {
      @Component({
        template: '<ag-card>Content</ag-card>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude elements inside the .ag-card__content container', () => {
        hostFixture.detectChanges();
        cardDebugger = getCardDebugger();
        const defaultTransclude = cardDebugger.nativeElement.querySelector(
          '.ag-card__content'
        );
        expect(defaultTransclude.innerText).toBe('Content');
      });
    });
  });
});
