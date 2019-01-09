# ag-snackbar

DESCRIPTION

## Usage

```html
<ag-snackbar-story
[theme]="theme"
[text]="text"
[positionTop]="positionTop"
[positionBottom]="positionBottom"
[positionLeft]="positionLeft"
[positionRight]="positionRight"></ag-snackbar-story>
```

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {SnackbarModule} from '@qwentes/agnostic/components';

@NgModule({
  declarations: [SnackbarExample],
  imports: [BrowserModule, SnackbarModule],
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
--ag-snackbar-height
--ag-snackbar-min-width
--ag-snackbar-max-width
--ag-snackbar-gap
--ag-snackbar-radius
--ag-snackbar-color-dark
--ag-snackbar-color-light
--ag-snackbar-background-color
--ag-snackbar-background-color-medium
--ag-snackbar-hover-color
--ag-snackbar-primary-color
--ag-snackbar-box-shadow
--ag-snackbar-font-family
```
