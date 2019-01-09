# ag-tabs

DESCRIPTION

## Usage

```html
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
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {TabsModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [TabsExample],
  imports: [BrowserModule, TabsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| iconClose | string |  |
| fit | string |  |


## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-tabs-gap-sm
--ag-tabs-gap-lg
--ag-tabs-color
--ag-tabs-color-hover
--ag-tabs-color-active
--ag-tabs-title-align
--ag-tabs-title-min-width
```
