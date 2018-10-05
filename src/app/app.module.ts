import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToggleModule } from './../../dist/components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ToggleModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
