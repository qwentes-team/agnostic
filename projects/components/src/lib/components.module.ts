import { NgModule } from '@angular/core';
import { ToggleModule } from './toggle/toggle.module';
import { ButtonModule } from './button/button.module';
import { ChipComponent } from './chip/chip.component';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  imports: [ToggleModule, ButtonModule, ChipComponent, DialogModule],
  exports: [ToggleModule, ButtonModule, ChipComponent, DialogModule]
})
export class ComponentsModule {
}
