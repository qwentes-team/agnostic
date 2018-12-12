import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
  selector: 'ag-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;
  public dynamicTabs: TabComponent[] = [];

  constructor(public componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(t => t.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
    this.dynamicTabs = [...this.tabs.toArray()];
  }

  public createTab(title: string, template: any, dataContext: any, isCloseable: boolean = false): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TabComponent);
    const componentRef = this.dynamicTabPlaceholder.createComponent(componentFactory);
    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = title;
    instance.template = template;
    instance.dataContext = dataContext;
    instance.isCloseable = isCloseable;
    this.dynamicTabs.push(instance);
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  public selectTab(tab: TabComponent): void {
    this.dynamicTabs.forEach(t => (t.active = false));
    tab.active = true;
  }

  public closeTab(tab: TabComponent) {
    const indexFound = this.dynamicTabs.findIndex(t => t === tab);
    this.dynamicTabs.splice(indexFound, 1);
    this.dynamicTabPlaceholder.remove(indexFound);
    if (this.dynamicTabs.length) {
      this.selectTab(this.dynamicTabs[0]);
    }
  }

  public closeActiveTab() {
    const activeTab = this.dynamicTabs.filter(tab => tab.active);
    if (activeTab.length > 0) {
      this.closeTab(activeTab[0]);
    }
  }
}
