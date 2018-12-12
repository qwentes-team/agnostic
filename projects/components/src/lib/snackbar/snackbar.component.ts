import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ag-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent implements OnInit {
  @Output()
  closeSnackbar: EventEmitter<any> = new EventEmitter();
  @Input()
  duration: number;

  public ngOnInit() {
    setTimeout(() => {
      this.closeSnackbar.emit();
    }, this.duration);
  }
}
