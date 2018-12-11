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

  const getCardDebugger = () => getChildDebugElement('ag-card').from(hostFixture);

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
    describe('position="card-header"', () => {
      @Component({
        template: '<ag-card><div position="card-header">Title</div></ag-card>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude elements inside the .ag-card__header container', () => {
        hostFixture.detectChanges();
        cardDebugger = getCardDebugger();
        const defaultTransclude = cardDebugger.nativeElement.querySelector('.ag-card__header');
        expect(defaultTransclude.innerHTML).toBe('<div position="card-header">Title</div>');
      });
    });

    describe('position="card-banner"', () => {
      @Component({
        template: '<ag-card><img position="card-banner" src="http://via.placeholder.com/640x360"></ag-card>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude elements inside the .ag-card__banner container', () => {
        hostFixture.detectChanges();
        cardDebugger = getCardDebugger();
        const defaultTransclude = cardDebugger.nativeElement.querySelector('.ag-card__banner');
        expect(defaultTransclude.innerHTML).toEqual(
          '<img position="card-banner" src="http://via.placeholder.com/640x360">'
        );
      });
    });

    describe('content', () => {
      @Component({
        template: '<ag-card>Content</ag-card>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude elements inside the .ag-card__content container', () => {
        hostFixture.detectChanges();
        cardDebugger = getCardDebugger();
        const defaultTransclude = cardDebugger.nativeElement.querySelector('.ag-card__content');
        expect(defaultTransclude.innerText).toBe('Content');
      });
    });

    describe('position="card-footer"', () => {
      @Component({
        template: '<ag-card><div position="card-footer">Footer</div></ag-card>',
      })
      class TestHostComponent {}

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should transclude elements inside the .ag-card__footer container', () => {
        hostFixture.detectChanges();
        cardDebugger = getCardDebugger();
        const defaultTransclude = cardDebugger.nativeElement.querySelector('.ag-card__footer');
        expect(defaultTransclude.innerText).toBe('Footer');
      });
    });
  });
});
