import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
  selector: 'ag-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;
  @Input() iconClose: string;
  public dynamicTabs: TabComponent[] = [];

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    @Attribute('fit') public fit
  ) {}

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(t => t.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  public getTabs(): TabComponent[] {
    return [...this.tabs.toArray(), ...this.dynamicTabs];
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
    this.cd.detectChanges();
  }

  public selectTab(tab: TabComponent): void {
    this.tabs.toArray().forEach(t => (t.active = false));
    this.dynamicTabs.forEach(t => (t.active = false));
    tab.active = true;
  }

  public closeTab(tab: TabComponent) {
    const indexFound = this.dynamicTabs.findIndex(t => t === tab);
    this.dynamicTabs.splice(indexFound, 1);
    this.dynamicTabPlaceholder.remove(indexFound);
    this.selectTab(this.tabs.first);
    this.cd.detectChanges();
  }

  public closeActiveTab() {
    const activeTab = this.dynamicTabs.filter(tab => tab.active);
    if (activeTab.length > 0) {
      this.closeTab(activeTab[0]);
    }
  }
}
