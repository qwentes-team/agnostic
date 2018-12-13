import {Component, DebugElement, OnInit} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InputComponent} from './input.component';
import {click, getChildDebugElement, updateValueOfInput, updateValueOfSelect} from '../../test.shared';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('InputComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let inputDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InputComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getInputDebugger = () => getChildDebugElement('ag-input').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    inputDebugger = null;
  });

  describe('Label', () => {
    @Component({template: '<ag-input name="foo">Foo label!</ag-input>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should transclude label', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      const labelDOM = inputDebugger.nativeElement.querySelector('.ag-input__label');
      expect(labelDOM.innerText).toBe('Foo label!');
    });
  });

  describe('[metaLabel]', () => {
    @Component({template: '<ag-input name="foo" metaLabel="super!">Foo label!</ag-input>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should transclude label', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      const labelDOM = inputDebugger.nativeElement.querySelector('.ag-input__label');
      expect(labelDOM.querySelector('span').innerText).toBe('super!');
    });
  });

  describe('(change)', () => {
    @Component({template: '<ag-input (change)="onChange($event)">Foo label!</ag-input><button>noop</button>'})
    class TestHostComponent {
      event: Event;

      onChange(e) {
        this.event = e;
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should emit changes', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      spyOn(hostFixture.componentInstance, 'onChange').and.callThrough();
      updateValueOfInput(inputDebugger.nativeElement.querySelector('input'), 'Foo', hostFixture).catch(console.log);
      expect(hostFixture.componentInstance.onChange).toHaveBeenCalled();
      expect(hostFixture.componentInstance.onChange.calls.count()).toBe(1);
      expect(hostFixture.componentInstance.onChange.calls.argsFor(0)[0]).toEqual(hostFixture.componentInstance.event);
    });
  });

  describe('(focus)', () => {
    @Component({template: '<ag-input (focus)="onFocus($event)">Foo label!</ag-input><button>noop</button>'})
    class TestHostComponent {
      event: Event;

      onFocus(e) {
        this.event = e;
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should emit focus', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      spyOn(hostFixture.componentInstance, 'onFocus').and.callThrough();
      const inputDOM = inputDebugger.nativeElement.querySelector('input');
      inputDOM.dispatchEvent(new Event('focus'));
      updateValueOfInput(inputDOM, 'Foo', hostFixture).catch(console.log);
      expect(hostFixture.componentInstance.onFocus).toHaveBeenCalled();
      expect(hostFixture.componentInstance.onFocus.calls.count()).toBe(1);
      expect(hostFixture.componentInstance.onFocus.calls.argsFor(0)[0]).toEqual(hostFixture.componentInstance.event);
    });
  });

  describe('(blur)', () => {
    @Component({template: '<ag-input (blur)="onBlur($event)">Foo label!</ag-input><button>noop</button>'})
    class TestHostComponent {
      event: Event;

      onBlur(e) {
        this.event = e;
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should emit blur', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      spyOn(hostFixture.componentInstance, 'onBlur').and.callThrough();
      const inputDOM = inputDebugger.nativeElement.querySelector('input');
      updateValueOfInput(inputDOM, 'Foo', hostFixture).catch(console.log);
      click(hostFixture.nativeElement.querySelector('button'));
      inputDOM.dispatchEvent(new Event('blur'));
      expect(hostFixture.componentInstance.onBlur).toHaveBeenCalled();
      expect(hostFixture.componentInstance.onBlur.calls.count()).toBe(1);
      expect(hostFixture.componentInstance.onBlur.calls.argsFor(0)[0]).toEqual(hostFixture.componentInstance.event);
    });
  });

  describe('[name]', () => {
    @Component({template: '<ag-input name="foo"></ag-input>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding name', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      expect(inputDebugger.componentInstance.name).toBe('foo');
      expect(inputDebugger.nativeElement.querySelector('input').getAttribute('name')).toBe('foo');
    });
  });

  describe('[value]', () => {
    @Component({template: '<ag-input value="bar"></ag-input>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding value', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      expect(inputDebugger.componentInstance.value).toBe('bar');
      expect(inputDebugger.nativeElement.querySelector('input').value).toBe('bar');
    });
  });

  describe('[disabled]', () => {
    @Component({template: '<ag-input disabled="true"></ag-input>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding disabled', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      expect(inputDebugger.componentInstance.disabled).toBe(true);
      expect(inputDebugger.nativeElement.querySelector('input').disabled).toBe(true);
    });

    it('should has disabled class', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      const inputElement: HTMLElement = inputDebugger.nativeElement;
      const inputContainer: HTMLElement = inputElement.querySelector('.ag-input');
      expect(inputContainer.classList.contains('ag-input--disabled')).toBe(true);
    });
  });

  describe('[required]', () => {
    @Component({template: '<ag-input required="true"></ag-input>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding required', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      expect(inputDebugger.componentInstance.required).toBe(true);
      expect(inputDebugger.nativeElement.querySelector('input').required).toBe(true);
    });
  });

  describe('[formControl]', () => {
    @Component({
      template: `
        <form [formGroup]="form" novalidate>
          <div formGroupName="item">
            <select formControlName="language" (change)="onChangeLanguage($event.target.value)">
              <option *ngFor="let option of selectOptions" [value]="option.id">{{ option.label }}</option>
            </select>
            <div formGroupName="translations">
              <div [formGroup]="form.get('item.translations.' + form.value.item.language)">
                <ag-input [formControl]="form.get('item.translations.' + form.value.item.language + '.inputValue')">
                </ag-input>
              </div>
            </div>
          </div>
        </form>
      `,
    })
    class TestHostComponent implements OnInit {
      form: FormGroup;
      selectOptions = [{id: 'en', label: 'ENG'}, {id: 'it', label: 'ITA'}, {id: 'fr', label: 'FRA'}];

      constructor(private fb: FormBuilder) {}

      public ngOnInit(): void {
        this.form = this.fb.group({
          item: this.fb.group({
            translations: this.fb.group({
              en: this.createFormGroupLanguage(),
            }),
            language: [this.selectOptions[0].id],
          }),
        });
      }

      public onChangeLanguage(langKey): void {
        (this.form.get('item.translations') as FormGroup).addControl(langKey, this.createFormGroupLanguage());
      }

      public createFormGroupLanguage(): FormGroup {
        return this.fb.group({inputValue: ['Initial value']});
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should change form value', () => {
      hostFixture.detectChanges();
      inputDebugger = getInputDebugger();
      const selectDOM = getChildDebugElement('select').from(hostFixture);
      const inputDOM = inputDebugger.nativeElement.querySelector('input');
      updateValueOfInput(inputDOM, 'Foo', hostFixture).catch(console.log);
      expect(inputDebugger.componentInstance.value).toBe('Foo');
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {inputValue: 'Foo'},
          },
          language: 'en',
        },
      });

      updateValueOfSelect(selectDOM.nativeElement, 'it', hostFixture).catch(console.log);
      expect(inputDOM.value).toBe('Initial value');
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {inputValue: 'Foo'},
            it: {inputValue: 'Initial value'},
          },
          language: 'it',
        },
      });

      updateValueOfInput(inputDOM, 'Bar', hostFixture).catch(console.log);
      expect(inputDebugger.componentInstance.value).toBe('Bar');
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {inputValue: 'Foo'},
            it: {inputValue: 'Bar'},
          },
          language: 'it',
        },
      });

      updateValueOfInput(inputDOM, 'Baz', hostFixture).catch(console.log);
      expect(inputDebugger.componentInstance.value).toBe('Baz');
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {inputValue: 'Foo'},
            it: {inputValue: 'Baz'},
          },
          language: 'it',
        },
      });

      updateValueOfSelect(selectDOM.nativeElement, 'en', hostFixture).catch(console.log);
      expect(inputDebugger.componentInstance.value).toBe('Foo');
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {inputValue: 'Foo'},
            it: {inputValue: 'Baz'},
          },
          language: 'en',
        },
      });
    });
  });
});
