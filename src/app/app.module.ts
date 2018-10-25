import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FabModule } from '../../projects/components/src/lib/fab/fab.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FabModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
