# ag-form-field

DESCRIPTION

## Usage

```html
      <div>
        <ag-form-field [label]="label" [metaLabel]="metaLabel">
          <input agInput placeholder="Write your fav color" required="true">
        </ag-form-field>
        <ag-form-field label="Material" metaLabel="optional">
          <ag-select method="hybrid" [options]="[{label: 'Wood', value: 'wood'}, {label: 'Metal', value: 'metal'}]"></ag-select>
        </ag-form-field>
        <ag-form-field label="Message">
          <textarea agInput placeholder="Write your message"></textarea>
        </ag-form-field>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {FormFieldModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [FormFieldExample],
  imports: [BrowserModule, FormFieldModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| label | string |  |
| metaLabel | string |  |


## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-form-field-font-size
--ag-form-field-gap
```
