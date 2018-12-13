import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AgOption, SelectComponent} from './select.component';
import {click, getChildDebugElement, updateValueOfInput, updateValueOfSelect} from '../../test.shared';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {OPTION_IT, OPTIONS, OPTIONS_WITH_STRING_TO_SEARCH, STRING_TO_SEARCH} from './select.mock';

// @TODO: tests for required

const SELECTOR = {
  SELECT_CONTAINER: '.ag-select',
  DISABLED: '.ag-select--disabled',
  NATIVE: '.ag-select__native',
  HYBRID: '.ag-select__hybrid',
  HYBRID_OPTIONS: '.ag-select__hybrid-options',
  AUTOCOMPLETE: '.ag-select__autocomplete',
  BACKDROP: '.ag-select__backdrop',
};

describe('SelectComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let selectDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SelectComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getSelectDebugger = () => getChildDebugElement('ag-select').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    selectDebugger = null;
  });

  describe('[native]', () => {
    describe('without FromControl', () => {
      @Component({
        template: `
          <ag-select [options]="options" [preselected]="preselected" [disabled]="disabled"></ag-select>
        `,
      })
      class TestHostComponent {
        options: AgOption[] = OPTIONS;
        preselected: string;
        disabled: boolean;
      }

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should be as default [method]', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        expect(selectElementDOM.querySelector(SELECTOR.NATIVE)).toBeDefined();
        expect(selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE)).toBeNull();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID)).toBeNull();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
      });

      it('should print the first option', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const selectDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.NATIVE);
        const selectedOption = selectDOM.selectedOptions[0];
        expect(selectedOption.value).toBe(String(OPTIONS[0].value));
        expect(selectedOption.text).toBe(OPTIONS[0].label);
      });

      it('should print preselected option', () => {
        hostFixture.componentInstance.preselected = OPTION_IT.value;
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const selectDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.NATIVE);
        const selectedOption = selectDOM.selectedOptions[0];
        expect(selectedOption.value).toBe(OPTION_IT.value);
        expect(selectedOption.text).toBe(OPTION_IT.label);
      });

      it('should print preselected option', () => {
        hostFixture.componentInstance.preselected = OPTION_IT.value;
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const selectDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.NATIVE);
        const selectedOption = selectDOM.selectedOptions[0];
        expect(selectedOption.value).toBe(OPTION_IT.value);
        expect(selectedOption.text).toBe(OPTION_IT.label);
      });

      it('should disable select', () => {
        hostFixture.componentInstance.disabled = true;
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const selectDOM: HTMLElement = selectElementDOM.querySelector(SELECTOR.SELECT_CONTAINER);
        expect(selectDOM.classList.contains(SELECTOR.DISABLED.split('.')[1])).toBe(true);
      });
    });

    describe('with FormControl', () => {
      @Component({
        template: `
          <form [formGroup]="form" novalidate>
            <ag-select formControlName="language" method="native" [options]="options"></ag-select>
          </form>
        `,
      })
      class TestHostComponent {
        options: AgOption[] = OPTIONS;
        preselected: string;
        form: FormGroup;

        constructor(private fb: FormBuilder) {
          this.form = this.fb.group({
            language: [{value: OPTION_IT.value, disabled: false}],
          });
        }
      }

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should init value defined in FormBuilder', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectDOM: HTMLSelectElement = selectDebugger.nativeElement.querySelector(SELECTOR.NATIVE);
        const selectedOption = selectDOM.selectedOptions[0];
        expect(selectedOption.value).toBe(OPTION_IT.value);
        expect(selectedOption.text).toBe(OPTION_IT.label);
      });

      it('should change form value', () => {
        const form: FormGroup = hostFixture.componentInstance.form;
        form.get('language').setValue(null);
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectDOM: HTMLSelectElement = selectDebugger.nativeElement.querySelector(SELECTOR.NATIVE);
        expect(form.value).toEqual({language: OPTIONS[0].value});
        updateValueOfSelect(selectDOM, OPTION_IT.value, hostFixture).catch(console.log);
        expect(form.value).toEqual({language: OPTION_IT.value});
      });

      it('should disable select', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectDOM: HTMLSelectElement = selectDebugger.nativeElement.querySelector(SELECTOR.NATIVE);
        expect(selectDOM.disabled).toBe(false);
        const form: FormGroup = hostFixture.componentInstance.form;
        form.get('language').disable();
        hostFixture.detectChanges();
        expect(selectDOM.disabled).toBe(true);
      });
    });
  });

  describe('[hybrid]', () => {
    describe('without FromControl', () => {
      @Component({
        template: `
          <ag-select method="hybrid" [options]="options" [preselected]="preselected"></ag-select>
        `,
      })
      class TestHostComponent {
        options: AgOption[] = OPTIONS;
        preselected: string;
      }

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should be hybrid select', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        expect((selectElementDOM.querySelector(SELECTOR.NATIVE) as HTMLSelectElement).options.length).toBe(0);
        expect(selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE)).toBeNull();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID)).toBeDefined();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
      });

      it('should print the first option', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.HYBRID);
        expect(labelDOM.innerText).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
      });

      it('should print preselected option', () => {
        hostFixture.componentInstance.preselected = OPTION_IT.value;
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.HYBRID);
        expect(labelDOM.innerText).toBe(String(OPTION_IT.label));
        expect(selectInstance.currentValue).toBe(OPTION_IT.value);
        expect(selectInstance.currentLabel).toBe(String(OPTION_IT.label));
      });

      it('should select a new hybrid option', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.HYBRID);
        expect(labelDOM.innerText).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
        click(labelDOM);
        hostFixture.detectChanges();
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        expect(optionsDOM).toBeDefined();
        const itOptionDOM = [].find.call(optionsDOM.children, child => child.innerText === OPTION_IT.label);
        click(itOptionDOM);
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(labelDOM.innerText).toBe(String(OPTION_IT.label));
        expect(selectInstance.currentValue).toBe(OPTION_IT.value);
        expect(selectInstance.currentLabel).toBe(String(OPTION_IT.label));
      });

      it('should close options on click out', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.HYBRID);
        expect(selectElementDOM.querySelector(SELECTOR.BACKDROP)).toBeNull();
        click(labelDOM);
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeDefined();
        expect(selectElementDOM.querySelector(SELECTOR.BACKDROP)).toBeDefined();
        click(selectElementDOM.querySelector(SELECTOR.BACKDROP));
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(selectElementDOM.querySelector(SELECTOR.BACKDROP)).toBeNull();
      });
    });

    describe('with FromControl', () => {
      @Component({
        template: `
          <form [formGroup]="form" novalidate>
            <ag-select formControlName="language" method="hybrid" [options]="options"></ag-select>
          </form>
        `,
      })
      class TestHostComponent {
        options: AgOption[] = OPTIONS;
        preselected: string;
        form: FormGroup;

        constructor(private fb: FormBuilder) {
          this.form = this.fb.group({
            language: [{value: OPTION_IT.value, disabled: false}],
          });
        }
      }

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should init value defined in FormBuilder', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectDOM: HTMLSelectElement = selectDebugger.nativeElement.querySelector(SELECTOR.HYBRID);
        expect(selectDOM.innerText).toBe(OPTION_IT.label);
      });

      it('should change form value', () => {
        const form: FormGroup = hostFixture.componentInstance.form;
        form.get('language').setValue(null);
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.HYBRID);
        expect(form.value).toEqual({language: OPTIONS[0].value});
        click(labelDOM);
        hostFixture.detectChanges();
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        const itOptionDOM = [].find.call(optionsDOM.children, child => child.innerText === OPTION_IT.label);
        click(itOptionDOM);
        hostFixture.detectChanges();
        expect(form.value).toEqual({language: OPTION_IT.value});
      });
    });
  });

  describe('[autocomplete]', () => {
    describe('without FromControl', () => {
      @Component({
        template: '<ag-select method="autocomplete" [options]="options" [preselected]="preselected"></ag-select>',
      })
      class TestHostComponent {
        options: AgOption[] = OPTIONS;
        preselected: string;
      }

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should be an autocomplete select', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        expect((selectElementDOM.querySelector(SELECTOR.NATIVE) as HTMLSelectElement).options.length).toBe(0);
        expect(selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE)).toBeDefined();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID)).toBeNull();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
      });

      it('should print the first option', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
      });

      it('should print preselected option', () => {
        hostFixture.componentInstance.preselected = OPTION_IT.value;
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTION_IT.label));
        expect(selectInstance.currentValue).toBe(OPTION_IT.value);
        expect(selectInstance.currentLabel).toBe(String(OPTION_IT.label));
      });

      it('should select a new hybrid option', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
        click(labelDOM);
        updateValueOfInput(labelDOM, OPTION_IT.label, hostFixture);
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        expect(optionsDOM).toBeDefined();
        const itOptionDOM = [].find.call(optionsDOM.children, child => child.innerText === OPTION_IT.label);
        click(itOptionDOM);
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(labelDOM.value).toBe(String(OPTION_IT.label));
        expect(selectInstance.currentValue).toBe(OPTION_IT.value);
        expect(selectInstance.currentLabel).toBe(String(OPTION_IT.label));
      });

      it('should close options on click out', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(selectElementDOM.querySelector(SELECTOR.BACKDROP)).toBeNull();
        click(labelDOM);
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeDefined();
        expect(selectElementDOM.querySelector(SELECTOR.BACKDROP)).toBeDefined();
        click(selectElementDOM.querySelector(SELECTOR.BACKDROP));
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(selectElementDOM.querySelector(SELECTOR.BACKDROP)).toBeNull();
      });

      it('should search a new hybrid option', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
        click(labelDOM);
        updateValueOfInput(labelDOM, STRING_TO_SEARCH, hostFixture);
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        expect(optionsDOM).toBeDefined();
        expect(optionsDOM.children.length).toBe(OPTIONS_WITH_STRING_TO_SEARCH.length);
        const itOptionDOM = [].find.call(optionsDOM.children, child => child.innerText === OPTION_IT.label);
        click(itOptionDOM);
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(labelDOM.value).toBe(String(OPTION_IT.label));
        expect(selectInstance.currentValue).toBe(OPTION_IT.value);
        expect(selectInstance.currentLabel).toBe(String(OPTION_IT.label));
      });

      it('should select new value on click out if search text is the same of the suggestion value', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
        click(labelDOM);
        updateValueOfInput(labelDOM, 'italy', hostFixture);
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        expect(optionsDOM).toBeDefined();
        click(document.querySelector(SELECTOR.BACKDROP));
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(labelDOM.value).toBe(String(OPTION_IT.label));
        expect(selectInstance.currentValue).toBe(OPTION_IT.value);
        expect(selectInstance.currentLabel).toBe(String(OPTION_IT.label));
      });

      it('should select new value on label click if search text is the same of the suggestion value', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
        click(labelDOM);
        updateValueOfInput(labelDOM, 'italy', hostFixture);
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        expect(optionsDOM).toBeDefined();
        click(labelDOM);
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(labelDOM.value).toBe(String(OPTION_IT.label));
        expect(selectInstance.currentValue).toBe(OPTION_IT.value);
        expect(selectInstance.currentLabel).toBe(String(OPTION_IT.label));
      });

      it(`should prevent a new selection on backdrop click if search text doesn't match any option value`, () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
        click(labelDOM);
        updateValueOfInput(labelDOM, 'italiaaa', hostFixture);
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        expect(optionsDOM).toBeDefined();
        click(document.querySelector(SELECTOR.BACKDROP));
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
      });

      it(`should prevent a new selection on label click if search text doesn't match any option value`, () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectInstance: SelectComponent = selectDebugger.componentInstance;
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLInputElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
        click(labelDOM);
        updateValueOfInput(labelDOM, 'italiaaa', hostFixture);
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        expect(optionsDOM).toBeDefined();
        click(labelDOM);
        hostFixture.detectChanges();
        expect(selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS)).toBeNull();
        expect(labelDOM.value).toBe(String(OPTIONS[0].label));
        expect(selectInstance.currentValue).toBe(OPTIONS[0].value);
        expect(selectInstance.currentLabel).toBe(String(OPTIONS[0].label));
      });
    });

    describe('with FromControl', () => {
      @Component({
        template: `
          <form [formGroup]="form" novalidate>
            <ag-select formControlName="language" method="autocomplete" [options]="options"></ag-select>
          </form>
        `,
      })
      class TestHostComponent {
        options: AgOption[] = OPTIONS;
        preselected: string;
        form: FormGroup;

        constructor(private fb: FormBuilder) {
          this.form = this.fb.group({
            language: [{value: OPTION_IT.value, disabled: false}],
          });
        }
      }

      beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

      it('should init value defined in FormBuilder', () => {
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectDOM: HTMLSelectElement = selectDebugger.nativeElement.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(selectDOM.value).toBe(OPTION_IT.label);
      });

      it('should change form value', () => {
        const form: FormGroup = hostFixture.componentInstance.form;
        form.get('language').setValue(null);
        hostFixture.detectChanges();
        selectDebugger = getSelectDebugger();
        const selectElementDOM: HTMLSelectElement = selectDebugger.nativeElement;
        const labelDOM: HTMLSelectElement = selectElementDOM.querySelector(SELECTOR.AUTOCOMPLETE);
        expect(form.value).toEqual({language: OPTIONS[0].value});
        click(labelDOM);
        updateValueOfInput(labelDOM, STRING_TO_SEARCH, hostFixture).catch(console.log);
        const optionsDOM = selectElementDOM.querySelector(SELECTOR.HYBRID_OPTIONS);
        const itOptionDOM = [].find.call(optionsDOM.children, child => child.innerText === OPTION_IT.label);
        click(itOptionDOM);
        hostFixture.detectChanges();
        expect(form.value).toEqual({language: OPTION_IT.value});
      });
    });
  });
});
