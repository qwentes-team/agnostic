import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {AgCarousel, CarouselComponent} from './carousel.component';
import {getChildDebugElement} from '../../test.shared';
import {CarouselDotsComponent} from './carousel-dots/carousel-dots.component';

describe('CarouselComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let carouselDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent, CarouselDotsComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getCarouselDebugger = () => getChildDebugElement('ag-carousel').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    carouselDebugger = null;
  });

  describe('rendering', () => {
    @Component({
      template: `
        <ag-carousel [config]="config" (init)="onCarouselInit($event)" (change)="onCarouselChange($event)">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </ag-carousel>
      `,
    })
    class TestHostComponent {
      public config = {dots: true};
      public instance: any;

      onCarouselInit(e) {
        this.instance = e;
      }

      onCarouselChange(e) {}
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should render a carousel', () => {
      hostFixture.detectChanges();
      const carouselElement = getCarouselDebugger().nativeElement;
      const carouselSlides = carouselElement.querySelector('.ag-carousel').children[0].children;
      expect(carouselSlides.length).toBe(3);
      expect(carouselElement.querySelector('ag-carousel-dots')).toBeDefined();
    });

    it('should render a carousel without dots', () => {
      hostFixture.componentInstance.config.dots = false;
      hostFixture.detectChanges();
      const carouselElement = getCarouselDebugger().nativeElement;
      expect(carouselElement.querySelector('ag-carousel-dots')).toBeNull();
    });

    it('should emit init event', () => {
      const spy = spyOn(hostFixture.componentInstance, 'onCarouselInit').and.callThrough();
      hostFixture.detectChanges();
      expect(spy.calls.count()).toBe(1);
      const arg = spy.calls.first().args[0];
      expect(arg instanceof AgCarousel).toBe(true);
    });

    it('should emit change carousel slide', () => {
      const spy = spyOn(hostFixture.componentInstance, 'onCarouselChange').and.callThrough();
      hostFixture.detectChanges();
      const carousel: AgCarousel = hostFixture.componentInstance.instance;
      carousel.next();
      expect(spy.calls.count()).toBe(1);
      const argNext: AgCarousel = spy.calls.first().args[0];
      expect(argNext instanceof AgCarousel).toBe(true);
      expect(argNext.currentIndex).toBe(1);
      carousel.prev();
      const argPrev: AgCarousel = spy.calls.all()[1].args[0];
      expect(argPrev instanceof AgCarousel).toBe(true);
      expect(argPrev.currentIndex).toBe(0);
      carousel.goTo(2);
      const argGo: AgCarousel = spy.calls.all()[2].args[0];
      expect(argGo instanceof AgCarousel).toBe(true);
      expect(argGo.currentIndex).toBe(2);
    });
  });
});
