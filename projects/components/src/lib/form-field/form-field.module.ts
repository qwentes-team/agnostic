import {NgModule} from '@angular/core';
import {FormFieldComponent} from './form-field.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [FormFieldComponent],
  exports: [FormFieldComponent],
})
export class FormFieldModule {}
