import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ag-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent implements OnChanges {
  @Input() label: string;
  @Input() metaLabel: string;
  public hasMessage: boolean;

  ngOnChanges({label, metaLabel}: SimpleChanges): void {
    if (label || metaLabel) {
      const labelValue = label && label.currentValue;
      const metaLabelValue = metaLabel && metaLabel.currentValue;
      this.hasMessage = Boolean(labelValue || metaLabelValue);
    }
  }
}
