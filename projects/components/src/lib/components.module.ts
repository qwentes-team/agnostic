import { NgModule } from '@angular/core';
import { ToggleModule } from './toggle/toggle.module';
import { ButtonModule } from './button/button.module';
import { FabModule } from './fab/fab.module';

@NgModule({
  imports: [ToggleModule, ButtonModule, FabModule],
  exports: [ToggleModule, ButtonModule, FabModule]
})
export class ComponentsModule {
}
