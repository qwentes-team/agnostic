import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ag-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent implements OnChanges {
  @Input() public label: string;
  @Input() public metaLabel: string;
  public hasMessage: boolean;

  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach();
  }

  ngOnChanges({label, metaLabel}: SimpleChanges): void {
    if (label || metaLabel) {
      const labelValue = label && label.currentValue;
      const metaLabelValue = metaLabel && metaLabel.currentValue;
      this.hasMessage = Boolean(labelValue || metaLabelValue);
      this.cd.detectChanges();
    }
  }
}
