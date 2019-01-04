# ag-toggle

DESCRIPTION

## Usage

```html
      <div>
        <h3>Checkbox</h3>
        <ag-toggle (change)="change($event)" theme="ios" name="color" value="blue" disabled="true" checked="true">Blue</ag-toggle>
        <ag-toggle (change)="change($event)" theme="ios" name="color" value="green" disabled="true">Green</ag-toggle>
        <ag-toggle (change)="change($event)" theme="ios" name="color" value="yellow">Yellow</ag-toggle>
      </div>
      <div>
        <h3>Radio</h3>
        <ag-toggle (change)="change($event)" type="radio" name="color" value="blue" >Blue</ag-toggle>
        <ag-toggle (change)="change($event)" type="radio" name="color" value="green">Green</ag-toggle>
        <ag-toggle (change)="change($event)" type="radio" name="color" value="yellow" checked="true">Yellow</ag-toggle>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {ToggleModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [ToggleExample],
  imports: [BrowserModule, ToggleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| name | string |  |
| value | any |  |
| checked | ToggleBoolean |  |
| disabled | ToggleBoolean |  |
| required | ToggleBoolean |  |
| type | ToggleType | 'checkbox' |
| theme | ToggleTheme | 'material' |
| position | TogglePosition | 'before' |


## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-toggle-gap
--ag-toggle-disabled-opacity
```
