# ag-checkbox

DESCRIPTION

## Usage

```html
      <div>
        <h3>Checkbox Variations</h3>
        <ag-checkbox>default</ag-checkbox>
        <ag-checkbox checked="true">checked</ag-checkbox>
        <ag-checkbox disabled="true" position="after">disabled</ag-checkbox>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {CheckboxModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [CheckboxExample],
  imports: [BrowserModule, CheckboxModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| name | string |  |
| required | CheckboxBoolean |  |
| disabled | CheckboxBoolean |  |
| checked | CheckboxBoolean |  |
| value | any |  |


## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-checkbox-size
--ag-checkbox-check-weight
--ag-checkbox-gap
--ag-checkbox-background-color
--ag-checkbox-border
--ag-checkbox-radius
--ag-checkbox-check-color
--ag-checkbox-background-color-primary
--ag-checkbox-disabled-opacity
```
