import {Component, DebugElement, OnInit} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InputComponent, InputDirective} from './input.component';
import {getChildDebugElement, updateValueOfInput, updateValueOfSelect} from '../../test.shared';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('InputComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let inputDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InputComponent, InputDirective, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getInputDebugger = () => getChildDebugElement('[agInput]').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    inputDebugger = null;
  });

  describe('directive', () => {
    @Component({template: '<input agInput><textarea agInput></textarea>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should add ag-input class to input element', () => {
      hostFixture.detectChanges();
      const elementDom = hostFixture.nativeElement.querySelector('input');
      expect(elementDom.classList.contains('ag-input')).toBe(true);
    });

    it('should add ag-input class to input element', () => {
      hostFixture.detectChanges();
      const elementDom = hostFixture.nativeElement.querySelector('textarea');
      expect(elementDom.classList.contains('ag-input')).toBe(true);
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
                <input [formControl]="form.get('item.translations.' + form.value.item.language + '.inputValue')" />
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
      const selectDOM = getChildDebugElement('select').from(hostFixture);
      const inputDOM = hostFixture.nativeElement.querySelector('input');
      updateValueOfInput(inputDOM, 'Foo', hostFixture).catch(console.log);
      expect(inputDOM.value).toBe('Foo');
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
      expect(inputDOM.value).toBe('Bar');
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
      expect(inputDOM.value).toBe('Baz');
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
      expect(inputDOM.value).toBe('Foo');
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
