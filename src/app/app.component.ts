import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agnostic';
  form: FormGroup;
  myModel = true;
  colors = [
    {value: 'blue', checked: true},
    {value: 'red', checked: true},
    {value: 'yellow', checked: true},
    {value: 'pink', checked: true},
    {value: 'violet', checked: true},
    {value: 'purple', checked: false},
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      color: this.fb.array(this.colors.map(c => this.fb.control(c.checked))),
    })

    console.log(this.form.value);
    this.form.valueChanges.subscribe(console.log)
  }

  get formColor(): FormArray {
    return this.form.get('color') as FormArray;
  }
}
