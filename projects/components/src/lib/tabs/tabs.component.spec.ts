import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TabsComponent} from './tabs.component';
import {Component, ComponentFactoryResolver, DebugElement} from '@angular/core';
import {click, getChildDebugElement} from '../../test.shared';
import {TabComponent} from './tab/tab.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('TabsComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let tabsDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent, TabComponent, HostComponentClass],
      providers: [ComponentFactoryResolver],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [TabComponent],
      },
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getTabsDebugger = () => getChildDebugElement('ag-tabs').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    tabsDebugger = null;
  });

  describe('Init', () => {
    @Component({template: '<ag-tabs></ag-tabs>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should create tabs', () => {
      hostFixture.detectChanges();
      tabsDebugger = getTabsDebugger();
      expect(tabsDebugger.nativeElement).toBeTruthy();
    });
  });

  describe('[ng-content]', () => {
    @Component({template: '<ag-tabs><ag-tab title="Tab 1" >Tab 1 Content</ag-tab></ag-tabs>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should create tabs with a tab', () => {
      hostFixture.detectChanges();
      tabsDebugger = getTabsDebugger();
      const tab = tabsDebugger.nativeElement.querySelectorAll('ag-tab');
      expect(tab.length).toBeTruthy();
      expect(tab.length).toBe(1);
    });
  });

  describe('Active', () => {
    @Component({
      template: `
        <ag-tabs>
          <ag-tab title="Tab 1">Tab 1 Content</ag-tab>
          <ag-tab title="Tab 2">Tab 2 Content</ag-tab>
        </ag-tabs>
      `,
    })
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should active the first tab', () => {
      hostFixture.detectChanges();
      tabsDebugger = getTabsDebugger();
      const firstTabTitle = tabsDebugger.nativeElement.querySelector('.ag-tabs__tab-title');
      const isFirstActive = firstTabTitle.classList.contains('active');
      expect(isFirstActive).toBe(true);
    });

    it('should click and active the second tab', () => {
      hostFixture.detectChanges();
      tabsDebugger = getTabsDebugger();
      const secondTabTitle = tabsDebugger.nativeElement.querySelectorAll('.ag-tabs__tab-title')[1];
      click(secondTabTitle);
      hostFixture.detectChanges();
      const isSecondActive = secondTabTitle.classList.contains('active');
      expect(isSecondActive).toBe(true);
    });
  });

  describe('fit', () => {
    @Component({
      template: `
        <ag-tabs fit="true">
          <ag-tab title="Tab 1">Tab 1 Content</ag-tab>
          <ag-tab title="Tab 2">Tab 2 Content</ag-tab>
        </ag-tabs>
      `,
    })
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should tab nav be fit to 100% width', () => {
      hostFixture.detectChanges();
      tabsDebugger = getTabsDebugger();
      const nav = tabsDebugger.nativeElement.querySelector('.ag-tabs__nav');
      const computedStyleForNav = window.getComputedStyle(nav);
      hostFixture.detectChanges();
      expect(computedStyleForNav.display).toBe('grid');
    });
  });
});
