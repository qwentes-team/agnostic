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
  @Input() public iconClose: string;
  public dynamicTabs: TabComponent[] = [];

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    @Attribute('fit') public fit
  ) {
    this.cd.detach();
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(t => t.active);
    if (this.tabs.length && activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
    this.cd.detectChanges();
  }

  public getTabs(): TabComponent[] {
    return [...this.tabs.toArray(), ...this.dynamicTabs];
  }

  public createTab(options: {
    title: string;
    template: any;
    dataContext?: any;
    isCloseable?: boolean;
    icon?: string;
  }): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TabComponent);
    const componentRef = this.dynamicTabPlaceholder.createComponent(componentFactory);
    const instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = options.title;
    instance.template = options.template;
    instance.dataContext = options.dataContext;
    instance.isCloseable = options.isCloseable;
    instance.icon = options.icon;
    this.dynamicTabs.push(instance);
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
    this.cd.detectChanges();
  }

  public selectTab(tab: TabComponent): void {
    this.tabs.toArray().forEach(t => (t.active = false));
    this.dynamicTabs.forEach(t => (t.active = false));
    tab.active = true;
    this.cd.detectChanges();
  }

  public closeTab(tab: TabComponent): void {
    const indexFound = this.dynamicTabs.findIndex(t => t === tab);
    this.dynamicTabs.splice(indexFound, 1);
    this.dynamicTabPlaceholder.remove(indexFound);
    this.selectTab(this.tabs.first);
    this.cd.detectChanges();
  }

  public closeActiveTab(): void {
    const activeTab = this.dynamicTabs.filter(tab => tab.active);
    if (activeTab.length > 0) {
      this.closeTab(activeTab[0]);
    }
  }
}
