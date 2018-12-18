import {InfiniteScrollModule as NgxInfiniteScrollModule} from 'ngx-infinite-scroll';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfiniteScrollComponent} from './infinite-scroll.component';
import {Component, DebugElement} from '@angular/core';
import {getChildDebugElement} from '../../test.shared';

describe('InfiniteScrollComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let infiniteScrollDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollComponent, HostComponentClass],
      imports: [NgxInfiniteScrollModule],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getInfiniteScrollDebugger = () => getChildDebugElement('ag-infinite-scroll').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    infiniteScrollDebugger = null;
  });

  describe('transclude', () => {
    @Component({template: '<ag-infinite-scroll>INFINITE SCROLL CONTENT</ag-infinite-scroll>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should transclude the content', () => {
      hostFixture.detectChanges();
      infiniteScrollDebugger = getInfiniteScrollDebugger();
      const defaultTransclude = infiniteScrollDebugger.nativeElement.querySelector('[infiniteScroll]');
      expect(defaultTransclude.innerHTML).toBe('INFINITE SCROLL CONTENT');
    });
  });

  describe('[infiniteScrollDistance]', () => {
    @Component({template: '<ag-infinite-scroll [infiniteScrollDistance]="5"></ag-infinite-scroll>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind infiniteScrollDistance', () => {
      hostFixture.detectChanges();
      infiniteScrollDebugger = getInfiniteScrollDebugger();
      expect(infiniteScrollDebugger.componentInstance.infiniteScrollDistance).toBe(5);
      expect(
        infiniteScrollDebugger.nativeElement
          .querySelector('[infiniteScroll]')
          .getAttribute('ng-reflect-infinite-scroll-distance')
      ).toBe('5');
    });
  });

  describe('[infiniteScrollThrottle]', () => {
    @Component({template: '<ag-infinite-scroll [infiniteScrollThrottle]="100"></ag-infinite-scroll>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind infiniteScrollThrottle', () => {
      hostFixture.detectChanges();
      infiniteScrollDebugger = getInfiniteScrollDebugger();
      expect(infiniteScrollDebugger.componentInstance.infiniteScrollThrottle).toBe(100);
      expect(
        infiniteScrollDebugger.nativeElement
          .querySelector('[infiniteScroll]')
          .getAttribute('ng-reflect-infinite-scroll-throttle')
      ).toBe('100');
    });
  });

  describe('(scrolled)', () => {
    @Component({
      template: `
        <div>
          <div style="height: 300px"></div>
          <ag-infinite-scroll (scrolled)="fakeLog()"></ag-infinite-scroll>
        </div>
      `,
    })
    class TestHostComponent {
      fakeLog() {
        console.log('fake log');
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should output void', () => {
      hostFixture.detectChanges();
      infiniteScrollDebugger = getInfiniteScrollDebugger();
      spyOn(infiniteScrollDebugger.componentInstance.scrolled, 'emit');
      infiniteScrollDebugger.componentInstance.scrolled.emit();
      hostFixture.detectChanges();
      expect(infiniteScrollDebugger.componentInstance.scrolled.emit).toHaveBeenCalled();
    });
  });
});
