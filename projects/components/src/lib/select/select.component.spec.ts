import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AgOption, SelectComponent} from './select.component';
import {click, getChildDebugElement, updateValueOfInput, updateValueOfSelect} from '../../test.shared';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

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

const OPTIONS = [
  {label: 'Select Country', value: null},
  {label: 'Afghanistan', value: 'AF'},
  {label: 'Albania', value: 'AL'},
  {label: 'Algeria', value: 'DZ'},
  {label: 'Amer.Virgin Is.', value: 'VI'},
  {label: 'Andorra', value: 'AD'},
  {label: 'Angola', value: 'AO'},
  {label: 'Anguilla', value: 'AI'},
  {label: 'Antarctica', value: 'AQ'},
  {label: 'Antigua/Barbuda', value: 'AG'},
  {label: 'Argentina', value: 'AR'},
  {label: 'Armenia', value: 'AM'},
  {label: 'Aruba', value: 'AW'},
  {label: 'Australia', value: 'AU'},
  {label: 'Austria', value: 'AT'},
  {label: 'Azerbaijan', value: 'AZ'},
  {label: 'Bahamas', value: 'BS'},
  {label: 'Bahrain', value: 'BH'},
  {label: 'Bangladesh', value: 'BD'},
  {label: 'Barbados', value: 'BB'},
  {label: 'Belarus', value: 'BY'},
  {label: 'Belgium', value: 'BE'},
  {label: 'Belize', value: 'BZ'},
  {label: 'Benin', value: 'BJ'},
  {label: 'Bermuda', value: 'BM'},
  {label: 'Bhutan', value: 'BT'},
  {label: 'Bolivia', value: 'BO'},
  {label: 'Bonaire', value: 'BQ'},
  {label: 'Bosnia-Herz.', value: 'BA'},
  {label: 'Botswana', value: 'BW'},
  {label: 'Bouvet Island', value: 'BV'},
  {label: 'Brazil', value: 'BR'},
  {label: 'Brit.Ind.Oc.Ter', value: 'IO'},
  {label: 'Brit.Virgin Is.', value: 'VG'},
  {label: 'Brunei Dar-es-S', value: 'BN'},
  {label: 'Bulgaria', value: 'BG'},
  {label: 'Burkina-Faso', value: 'BF'},
  {label: 'Burundi', value: 'BI'},
  {label: 'Cambodia', value: 'KH'},
  {label: 'Cameroon', value: 'CM'},
  {label: 'Canada', value: 'CA'},
  {label: 'Cape Verdian', value: 'CV'},
  {label: 'Cayman Islands', value: 'KY'},
  {label: 'Centr.Afr.Rep.', value: 'CF'},
  {label: 'Chad', value: 'TD'},
  {label: 'Chile', value: 'CL'},
  {label: 'China', value: 'CN'},
  {label: 'Christmas Islnd', value: 'CX'},
  {label: 'Cocos Islands', value: 'CC'},
  {label: 'Colombia', value: 'CO'},
  {label: 'Comorin', value: 'KM'},
  {label: 'Congo', value: 'CG'},
  {label: 'Cook Islands', value: 'CK'},
  {label: 'Costa Rica', value: 'CR'},
  {label: 'Croatia', value: 'HR'},
  {label: 'Cuba', value: 'CU'},
  {label: 'Curaçao', value: 'CW'},
  {label: 'Cyprus', value: 'CY'},
  {label: 'Czech Republic', value: 'CZ'},
  {label: 'Denmark', value: 'DK'},
  {label: 'Djibouti', value: 'DJ'},
  {label: 'Dominica', value: 'DM'},
  {label: 'Dominican Rep.', value: 'DO'},
  {label: 'Dutch Antilles', value: 'AN'},
  {label: 'East Timor', value: 'TP'},
  {label: 'East Timor', value: 'TL'},
  {label: 'Ecuador', value: 'EC'},
  {label: 'Egypt', value: 'EG'},
  {label: 'El Salvador', value: 'SV'},
  {label: 'Equatorial Gui.', value: 'GQ'},
  {label: 'Eritrea', value: 'ER'},
  {label: 'Estonia', value: 'EE'},
  {label: 'Ethiopia', value: 'ET'},
  {label: 'Falkland Islnds', value: 'FK'},
  {label: 'Faroe Islands', value: 'FO'},
  {label: 'Fiji', value: 'FJ'},
  {label: 'Finland', value: 'FI'},
  {label: 'France', value: 'FR'},
  {label: 'Frenc.Polynesia', value: 'PF'},
  {label: 'French Guinea', value: 'GF'},
  {label: 'Gabon', value: 'GA'},
  {label: 'Gambia', value: 'GM'},
  {label: 'Georgia', value: 'GE'},
  {label: 'Germany', value: 'DE'},
  {label: 'Ghana', value: 'GH'},
  {label: 'Gibraltar', value: 'GI'},
  {label: 'Great Britain', value: 'GB'},
  {label: 'Greece', value: 'GR'},
  {label: 'Greenland', value: 'GL'},
  {label: 'Grenada', value: 'GD'},
  {label: 'Guadeloupe', value: 'GP'},
  {label: 'Guam', value: 'GU'},
  {label: 'Guatemala', value: 'GT'},
  {label: 'Guernsey', value: 'GG'},
  {label: 'Guinea', value: 'GN'},
  {label: 'Guinea-Bissau', value: 'GW'},
  {label: 'Guyana', value: 'GY'},
  {label: 'Haiti', value: 'HT'},
  {label: 'Heard/McDon.Isl', value: 'HM'},
  {label: 'Honduras', value: 'HN'},
  {label: 'Hong Kong', value: 'HK'},
  {label: 'Hungary', value: 'HU'},
  {label: 'Iceland', value: 'IS'},
  {label: 'India', value: 'IN'},
  {label: 'Indonesia', value: 'ID'},
  {label: 'Iran', value: 'IR'},
  {label: 'Iraq', value: 'IQ'},
  {label: 'Ireland', value: 'IE'},
  {label: 'Isle of Man', value: 'IM'},
  {label: 'Israel', value: 'IL'},
  {label: 'Italy', value: 'IT'},
  {label: 'Ivory Coast', value: 'CI'},
  {label: 'Jamaica', value: 'JM'},
  {label: 'Japan', value: 'JP'},
  {label: 'Jersey', value: 'JE'},
  {label: 'Jordan', value: 'JO'},
  {label: 'Kasachstan', value: 'KZ'},
  {label: 'Kenya', value: 'KE'},
  {label: 'Kirghistan', value: 'KG'},
  {label: 'Kiribati', value: 'KI'},
  {label: 'Kuwait', value: 'KW'},
  {label: 'Laos', value: 'LA'},
  {label: 'Latvia', value: 'LV'},
  {label: 'Lebanon', value: 'LB'},
  {label: 'Lesotho', value: 'LS'},
  {label: 'Liberia', value: 'LR'},
  {label: 'Libya', value: 'LY'},
  {label: 'Liechtenstein', value: 'LI'},
  {label: 'Lithuania', value: 'LT'},
  {label: 'Luxembourg', value: 'LU'},
  {label: 'Macau', value: 'MO'},
  {label: 'Macedonia', value: 'MK'},
  {label: 'Madagascar', value: 'MG'},
  {label: 'Malawi', value: 'MW'},
  {label: 'Malaysia', value: 'MY'},
  {label: 'Maldives', value: 'MV'},
  {label: 'Mali', value: 'ML'},
  {label: 'Malta', value: 'MT'},
  {label: 'Marshall Islnds', value: 'MH'},
  {label: 'Martinique', value: 'MQ'},
  {label: 'Mauretania', value: 'MR'},
  {label: 'Mauritius', value: 'MU'},
  {label: 'Mayotte', value: 'YT'},
  {label: 'Mexico', value: 'MX'},
  {label: 'Micronesia', value: 'FM'},
  {label: 'Minor Outl.Ins.', value: 'UM'},
  {label: 'Moldavia', value: 'MD'},
  {label: 'Monaco', value: 'MC'},
  {label: 'Mongolia', value: 'MN'},
  {label: 'Montenegro', value: 'ME'},
  {label: 'Montserrat', value: 'MS'},
  {label: 'Morocco', value: 'MA'},
  {label: 'Mozambique', value: 'MZ'},
  {label: 'Myanmar', value: 'MM'},
  {label: 'N.Mariana Islnd', value: 'MP'},
  {label: 'Namibia', value: 'NA'},
  {label: 'Nauru', value: 'NR'},
  {label: 'Nepal', value: 'NP'},
  {label: 'Netherlands', value: 'NL'},
  {label: 'New Caledonia', value: 'NC'},
  {label: 'New Zealand', value: 'NZ'},
  {label: 'Nicaragua', value: 'NI'},
  {label: 'Niger', value: 'NE'},
  {label: 'Nigeria', value: 'NG'},
  {label: 'Niue Islands', value: 'NU'},
  {label: 'Norfolk Island', value: 'NF'},
  {label: 'North Korea', value: 'KP'},
  {label: 'Norway', value: 'NO'},
  {label: 'Oman', value: 'OM'},
  {label: 'Pakistan', value: 'PK'},
  {label: 'Palau', value: 'PW'},
  {label: 'Panama', value: 'PA'},
  {label: 'Papua Nw Guinea', value: 'PG'},
  {label: 'Paraguay', value: 'PY'},
  {label: 'Peru', value: 'PE'},
  {label: 'Philippines', value: 'PH'},
  {label: 'Pitcairn Islnds', value: 'PN'},
  {label: 'Poland', value: 'PL'},
  {label: 'Portugal', value: 'PT'},
  {label: 'Puerto Rico', value: 'PR'},
  {label: 'Qatar', value: 'QA'},
  {label: 'Reunion', value: 'RE'},
  {label: 'Romania', value: 'RO'},
  {label: 'Ruanda', value: 'RW'},
  {label: 'Russian Fed.', value: 'RU'},
  {label: 'S.Tome,Principe', value: 'ST'},
  {label: 'Saint Barthélem', value: 'BL'},
  {label: 'Saint Martin', value: 'MF'},
  {label: 'Samoa,American', value: 'AS'},
  {label: 'San Marino', value: 'SM'},
  {label: 'Saudi Arabia', value: 'SA'},
  {label: 'Senegal', value: 'SN'},
  {label: 'Serbia', value: 'RS'},
  {label: 'Seychelles', value: 'SC'},
  {label: 'Sierra Leone', value: 'SL'},
  {label: 'Singapore', value: 'SG'},
  {label: 'Sint Maarten', value: 'SX'},
  {label: 'Slovakia', value: 'SK'},
  {label: 'Slovenia', value: 'SI'},
  {label: 'Solomon Islands', value: 'SB'},
  {label: 'Somalia', value: 'SO'},
  {label: 'South Africa', value: 'ZA'},
  {label: 'South Korea', value: 'KR'},
  {label: 'South Sudan', value: 'SS'},
  {label: 'Spain', value: 'ES'},
  {label: 'Sri Lanka', value: 'LK'},
  {label: 'St. Helena', value: 'SH'},
  {label: 'St. Lucia', value: 'LC'},
  {label: 'St. Vincent', value: 'VC'},
  {label: 'St.Chr.,Nevis', value: 'KN'},
  {label: 'St.Pier,Miquel.', value: 'PM'},
  {label: 'Sudan', value: 'SD'},
  {label: 'Suriname', value: 'SR'},
  {label: 'Svalbard', value: 'SJ'},
  {label: 'Swaziland', value: 'SZ'},
  {label: 'Sweden', value: 'SE'},
  {label: 'Switzerland', value: 'CH'},
  {label: 'Syria', value: 'SY'},
  {label: 'Tadzhikistan', value: 'TJ'},
  {label: 'Taiwan', value: 'TW'},
  {label: 'Tanzania', value: 'TZ'},
  {label: 'Thailand', value: 'TH'},
  {label: 'Togo', value: 'TG'},
  {label: 'Tokelau Islands', value: 'TK'},
  {label: 'Tonga', value: 'TO'},
  {label: 'Trinidad,Tobago', value: 'TT'},
  {label: 'Tunisia', value: 'TN'},
  {label: 'Turkey', value: 'TR'},
  {label: 'Turkmenistan', value: 'TM'},
  {label: 'Turksh Caicosin', value: 'TC'},
  {label: 'Tuvalu', value: 'TV'},
  {label: 'USA', value: 'US'},
  {label: 'Uganda', value: 'UG'},
  {label: 'Ukraine', value: 'UA'},
  {label: 'Unit.Arab Emir.', value: 'AE'},
  {label: 'Uruguay', value: 'UY'},
  {label: 'Uzbekistan', value: 'UZ'},
  {label: 'Vanuatu', value: 'VU'},
  {label: 'Vatican City', value: 'VA'},
  {label: 'Venezuela', value: 'VE'},
  {label: 'Vietnam', value: 'VN'},
  {label: 'Wallis,Futuna', value: 'WF'},
  {label: 'Western Sahara', value: 'EH'},
  {label: 'Western Samoa', value: 'WS'},
  {label: 'Yemen', value: 'YE'},
  {label: 'Yugoslavia', value: 'YU'},
  {label: 'Zaire', value: 'ZR'},
  {label: 'Zambia', value: 'ZM'},
  {label: 'Zimbabwe', value: 'ZW'},
  {label: 'stateless', value: 'STL'},
  {label: 'Åland Islands', value: 'AX'},
];
const OPTION_IT = OPTIONS.find(o => o.value === 'IT');
const STRING_TO_SEARCH = 'it';
const OPTIONS_WITH_STRING_TO_SEARCH = OPTIONS.filter(o => o.label.toLowerCase().includes(STRING_TO_SEARCH));
