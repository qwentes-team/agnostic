import {moduleMetadata, storiesOf} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {SECTION} from './../../../../../.storybook/config';
import {TabsComponent} from './tabs.component';
import {TabComponent} from './tab/tab.component';
import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'ag-tabs-dynamic-story',
  template: `
    <ag-tabs fit="true"> <ag-tab [title]="'Tab 1'">Tab Content 1</ag-tab> </ag-tabs>
    <ng-template #customTemplate let-person="data">Hi, I'm {{ person.name }}</ng-template>
    <button (click)="onCreateTab()">Create Dynamic Tab</button>
    <button (click)="onCloseActiveTab()" [disabled]="isNotCloseable()">Close active tab</button>
  `,
})
export class TabsStoryComponent {
  @ViewChild(TabsComponent, {static: false}) tabsComponent;
  @ViewChild('customTemplate', {static: false}) customTemplate;
  count = 1;
  person = {name: 'Mario', surname: 'Rossi'};

  onCreateTab() {
    this.count += 1;
    this.tabsComponent.createTab({
      title: `Tab ${this.count}`,
      template: this.customTemplate,
      dataContext: {name: `Tab number ${this.count}`},
      isCloseable: true,
    });
  }

  isNotCloseable() {
    return !!this.tabsComponent.tabs.first.active;
  }

  onCloseActiveTab() {
    this.tabsComponent.closeActiveTab();
  }
}

storiesOf(`${SECTION.LAYOUT}|Tabs`, module)
  .addDecorator(
    moduleMetadata({
      declarations: [TabsStoryComponent, TabsComponent, TabComponent],
      entryComponents: [TabComponent],
    })
  )
  .add('Demo', () => ({
    template: `
      <div>
        <h3>Default</h3>
        <ag-tabs>
          <ag-tab [title]="'Tab 1'">Tab 1 content</ag-tab>
          <ag-tab [title]="'Tab 2'">Tab 2 content</ag-tab>
        </ag-tabs>
        <h3>Fit</h3>
        <ag-tabs fit="true">
          <ag-tab [title]="'Tab 1'">Tab 1 content</ag-tab>
          <ag-tab [title]="'Tab 2'">Tab 2 content</ag-tab>
        </ag-tabs>
        <h3>With template</h3>
        <ag-tabs>
          <ag-tab [title]="'Tab 1'" [template]="template1"></ag-tab>
          <ag-tab [title]="'Tab 2'" [template]="template2"></ag-tab>
        </ag-tabs>
        <ng-template #template1>I'm the template for tab 1</ng-template>
        <ng-template #template2>I'm the template for tab 2</ng-template>
      </div>
    `,
  }))
  .add('Dynamic', () => ({
    template: `
      <div>
        <h3>Dynamic tabs</h3>
        <ag-tabs-dynamic-story></ag-tabs-dynamic-story>
      </div>
    `,
  }));
