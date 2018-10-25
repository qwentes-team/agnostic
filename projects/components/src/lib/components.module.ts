import { NgModule } from '@angular/core';
import { ToggleModule } from './toggle/toggle.module';
import { ButtonModule } from './button/button.module';
import {ChipComponent} from './chip/chip.component';

@NgModule({
  imports: [ToggleModule, ButtonModule, ChipComponent],
  exports: [ToggleModule, ButtonModule, ChipComponent]
})
export class ComponentsModule {
}
