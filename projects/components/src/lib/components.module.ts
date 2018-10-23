import { NgModule } from '@angular/core';
import { ToggleModule } from './toggle/toggle.module';
import { ButtonModule } from './button/button.module';

@NgModule({
  imports: [ToggleModule, ButtonModule],
  exports: []
})
export class ComponentsModule {
}
