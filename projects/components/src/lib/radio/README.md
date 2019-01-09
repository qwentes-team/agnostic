# ag-radio

Radio button component that wrap the native input radio.

Radios are generally used as a set of related options inside of a group, but they can also be used alone.

Pressing on a radio will check it.

## Usage

```html
      <div>
        <h3>Radio Variations</h3>
        <div style="display: flex; flex-flow: column">
          <ag-radio>Default</ag-radio>
          <ag-radio checked="true">Checked</ag-radio>
          <ag-radio disabled="true">Disabled</ag-radio>
          <ag-radio position="after">Position after</ag-radio>
        </div>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {RadioModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [RadioExample],
  imports: [BrowserModule, RadioModule],
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
| disabled | RadioBoolean |  |
| checked | RadioBoolean |  |
| required | RadioBoolean |  |


## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-radio-outer-size
--ag-radio-inner-size
--ag-radio-gap
--ag-radio-unchecked-color
--ag-radio-checked-color
--ag-radio-outer-border-size
--ag-radio-disabled-opacity
```
