# ag-input

DESCRIPTION

## Usage

```html
      <div>
        <input agInput disabled="true" value="I'm disabled!" placeholder="Color">
        <input agInput placeholder="Write your fav color!">
        <input agInput (change)="change($event)" (blur)="blur($event)" (focus)="focus($event)" placeholder="Write your fav material!" value="Wood">
      </div>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {InputModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [InputExample],
  imports: [BrowserModule, InputModule],
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
--ag-input-border-color
--ag-input-border
--ag-input-box-shadow-focus
--ag-input-font-size
--ag-input-border-radius
--ag-input-gap
--ag-input-disabled-opacity
--ag-input-background-color
```
