import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToggleModule } from './../../dist/components';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ToggleModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
