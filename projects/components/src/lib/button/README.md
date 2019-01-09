# ag-button

DESCRIPTION

## Usage

```html
    <div>
      <ag-button>classic</ag-button>&nbsp;<ag-button fill="clear">Clear</ag-button>&nbsp;<ag-button fill="outline">outline</ag-button>
      <ag-button expand="block" disabled="true">classic block disabled</ag-button>
      <ag-button expand="block"><span position="before">😀</span>Foo</ag-button>
      <ag-button expand="block">Foo<span position="after">😀</span></ag-button>
      <ag-button expand="block" shape="round">shape block</ag-button>
      <ag-button expand="block" fill="clear">clear block</ag-button>
      <ag-button expand="block" fill="outline">outline block</ag-button>
    </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {ButtonModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [ButtonExample],
  imports: [BrowserModule, ButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Properties

| Property  | Type  | Default |
|-----------|-------|---------|
| disable | boolean | false |
| expand | string |  |
| fill | string |  |
| shape | string |  |


## Events

No events

## CSS Custom Properties

These are the CSS custom properties you can manage:

```
--ag-button-height
--ag-button-outline-size
--ag-button-gap
--ag-button-radius
--ag-button-color
--ag-button-outline-color
--ag-button-disabled-opacity
--ag-button-disabled-background-color
--ag-button-background-color
--ag-button-background-color-hover
--ag-button-background-color-active
```
