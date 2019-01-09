# ag-card

DESCRIPTION

## Usage

```html
      <div>
        <h3>Card</h3>
        <ag-card>testo placeholder</ag-card>
        <ag-card>
          <h2 position="card-header">Titolo</h2>
          testo placeholder
        </ag-card>
        <ag-card>
          <img position="card-banner" src="https://tinyurl.com/y9hzzrmc">
          testo placeholder
        </ag-card>
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {CardModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [CardExample],
  imports: [BrowserModule, CardModule],
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
--ag-card-gap
--ag-card-radius
--ag-card-color-dark
--ag-card-color-light
--ag-card-background-color
--ag-card-box-shadow
```
