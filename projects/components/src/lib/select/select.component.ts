import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {fromEvent, merge, Subject} from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {convertToBoolean, EmitToNgModel, noop} from '../components.shared';

export class AgOption {
  constructor(public readonly label: string, public readonly value: any) {}
}

@Component({
  selector: 'ag-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit, EmitToNgModel, ControlValueAccessor {
  @Input() public options: AgOption[];
  @Input() public preselected: any;
  @Input() public disabled: any;
  @Input() public required: any;
  @Input() public method: 'native' | 'hybrid' | 'autocomplete' = 'native';
  @Output() public change: EventEmitter<any> = new EventEmitter();
  @ViewChild('nativeSelect') nativeSelectRef: ElementRef;
  @ViewChild('autocompleteSelect') autocompleteSelectRef: ElementRef;

  public currentOptions: AgOption[];
  public currentValue: any;
  public currentLabel: string;
  public onChange = noop.onChange;
  public onTouched = noop.onTouched;
  public areVisibleHybridOptions: boolean;
  public isNative: boolean;
  public isHybrid: boolean;
  public isAutocomplete: boolean;
  public hybridEvent$: Subject<AgOption> = new Subject();
  public autocompleteEvent$: Subject<AgOption> = new Subject();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach();
  }

  public ngOnInit() {
    this.defineMethod(this.method);
    if (!this.currentValue) {
      this.updateValue(this.options[0].value);
    } else {
      this.cd.detectChanges();
    }
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  public ngOnChanges({method, preselected, required, disabled, options}: SimpleChanges): void {
    if (preselected) {
      this.updateValue(preselected.currentValue);
    }
    if (method) {
      this.defineMethod(method.currentValue);
    }
    if (disabled) {
      this.setDisabledState(disabled.currentValue);
    }
    if (required) {
      this.required = convertToBoolean(required.currentValue);
    }
  }

  public ngAfterViewInit(): void {
    merge(fromEvent(this.nativeSelectRef.nativeElement, 'change'), this.hybridEvent$, this.autocompleteEvent$)
      .pipe(
        tap(() => this.toggleHybridOptions(false)),
        map(changes => this.getNewValueFromChanges(changes)),
        filter(newValue => newValue !== this.currentValue),
        takeUntil(this.destroy$)
      )
      .subscribe(newValue => {
        this.emitToNgModel(newValue);
        this.change.emit(newValue);
      });
  }

  public shouldUpdateAutocompleteValue() {
    if (!this.areVisibleHybridOptions) {
      this.shouldFindValueFromAutocomplete();
    }
  }

  public toggleHybridOptions(forceValue?) {
    if (this.disabled) {
      this.areVisibleHybridOptions = false;
      return;
    }
    const newValue = typeof forceValue === 'boolean' ? forceValue : !this.areVisibleHybridOptions;
    this.areVisibleHybridOptions = (this.isHybrid || this.isAutocomplete) && newValue;
    this.cd.detectChanges();
  }

  private defineMethod(method) {
    this.isNative = method === 'native';
    this.isHybrid = method === 'hybrid';
    this.isAutocomplete = method === 'autocomplete';
  }

  private getNewValueFromChanges(changes): any {
    const selectElement = <HTMLSelectElement>(<Event>changes).target;
    return selectElement ? selectElement.value : (changes as AgOption).value;
  }

  private setCurrentValue(newValue) {
    this.currentValue = newValue;
  }

  private setCurrentLabel(newValue: any): string {
    const optionFound = this.options.find(o => String(o.value) === String(newValue)) || ({} as AgOption);
    this.currentLabel = optionFound.label;
    return this.currentLabel;
  }

  public filterOptionsByLabel(newLabel) {
    const label = String(newLabel).toLowerCase();
    this.currentOptions = this.isAutocomplete
      ? this.options.filter(o =>
          String(o.label)
            .toLowerCase()
            .includes(label)
        )
      : this.options;
    this.cd.detectChanges();
  }

  private shouldFindValueFromAutocomplete(): void {
    if (!this.autocompleteSelectRef) {
      return;
    }
    const newLabel = this.autocompleteSelectRef.nativeElement.value.toLowerCase();
    const isOneOption = this.currentOptions.length === 1;
    const isOneOptionWithSameLabel = isOneOption && this.currentOptions[0].label.toLowerCase() === newLabel;
    if (isOneOptionWithSameLabel) {
      this.autocompleteEvent$.next(this.currentOptions[0]);
    } else {
      this.filterOptionsByLabel(this.currentLabel);
      this.autocompleteSelectRef.nativeElement.value = this.currentLabel;
    }
  }

  public trackByFn(index, element): any {
    return index;
  }

  public updateValue(newValue): any {
    this.setCurrentValue(newValue);
    this.filterOptionsByLabel(this.setCurrentLabel(newValue));
    this.cd.detectChanges();
    return newValue;
  }

  public writeValue(value: any): void {
    this.updateValue(value);
  }

  public registerOnChange(fn: (value: boolean | any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled): void {
    this.disabled = convertToBoolean(disabled);
    this.cd.detectChanges();
  }

  public emitToNgModel(value: any): void {
    this.onChange(this.updateValue(value));
  }
}
