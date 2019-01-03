import {ChangeDetectionStrategy, Component, Directive, HostBinding, ViewEncapsulation} from '@angular/core';

@Directive({selector: InputDirective.selector})
export class InputDirective {
  static selector = 'input[agInput], textarea[agInput]';
  static class = 'ag-input';
  @HostBinding(`class.${InputDirective.class}`) private hostClass = true;
}

@Component({
  selector: InputDirective.selector,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {}
