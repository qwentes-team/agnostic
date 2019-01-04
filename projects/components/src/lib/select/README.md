# ag-select

DESCRIPTION

## Usage

```html
      <div>
        <h3>Native</h3>
        <ag-select method="native" [(ngModel)]="nativeValue" [options]="options" [disabled]="disabled"></ag-select>
        <div>Native Value: {{nativeValue}}</div>
        <h3>Hybrid</h3>
        <ag-select method="hybrid" [(ngModel)]="hybridValue" [options]="options" [disabled]="disabled"></ag-select>
        <div>Hybrid Value: {{hybridValue}}</div>
        <h3>Autocomplete</h3>
        <ag-select method="autocomplete" [(ngModel)]="autocompleteValue" [options]="options" [disabled]="disabled"></ag-select>
        <div>Autocomplete Value: {{autocompleteValue}}</div>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {SelectModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [SelectExample],
  imports: [BrowserModule, SelectModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| options | AgOption[] |  |
| preselected | any |  |
| disabled | any |  |
| required | any |  |
| method | 'native' | 'native' |


## Events

| Event  | Return |
|--------|--------|
| change | any |


## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-select-height
--ag-select-symbol-image: url('https
--ag-select-symbol-size
--ag-select-border-color
--ag-select-border
--ag-select-gap
--ag-select-background-color
--ag-select-disabled-opacity
--ag-select-border-radius
--ag-select-hybrid-options-box-shadow
--ag-select-hybrid-option-border
--ag-select-hybrid-options-background-color
```
