# ag-chip

DESCRIPTION

## Usage

```html
      <div>
        <h3>Color Variations</h3>
        <ag-chip>Content</ag-chip>
        <ag-chip color="primary" label-color="light">Content</ag-chip>
        <ag-chip color="success" label-color="light">Content</ag-chip>
        <ag-chip color="warning">Content</ag-chip>
        <ag-chip color="danger" label-color="light">Content</ag-chip>
        <h3>Icon position</h3>
        <ag-chip>
          Content
          <span position="before">•</span>
        </ag-chip>
        <ag-chip>
          Content
          <span position="after">•</span>
        </ag-chip>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {ChipModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [ChipExample],
  imports: [BrowserModule, ChipModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

No properties

## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-chip-height
--ag-chip-gap
--ag-chip-radius
--ag-chip-color-dark
--ag-chip-color-light
--ag-chip-background-color
--ag-chip-primary-background-color
--ag-chip-success-background-color
--ag-chip-warning-background-color
--ag-chip-danger-background-color
```
