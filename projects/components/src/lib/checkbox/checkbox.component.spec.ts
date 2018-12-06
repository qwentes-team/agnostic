import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckboxComponent} from './checkbox.component';
import {Component, DebugElement, OnInit} from '@angular/core';
import {click, getChildDebugElement, updateValueOfInput, updateValueOfSelect} from '../../test.shared';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('CheckboxComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let checkboxDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CheckboxComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getCheckboxDebugger = () => getChildDebugElement('ag-checkbox').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    checkboxDebugger = null;
  });

  describe('[name]', () => {
    @Component({template: '<ag-checkbox name="nome"></ag-checkbox>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind name', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.name).toBe('nome');
      expect(checkboxDebugger.nativeElement.querySelector('.ag-checkbox__input').getAttribute('name')).toBe('nome');
    });
  });

  describe('[value]', () => {
    @Component({template: '<ag-checkbox value="valore"></ag-checkbox>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind value', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.value).toBe('valore');
      expect(checkboxDebugger.nativeElement.querySelector('.ag-checkbox__input').getAttribute('value')).toBe('valore');
    });
  });

  describe('[checked]', () => {
    @Component({template: '<ag-checkbox checked="true"></ag-checkbox>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind checked', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.checked).toBe(true);
      expect(checkboxDebugger.nativeElement.querySelector('input').checked).toBe(true);
    });
  });

  describe('[disabled]', () => {
    @Component({template: '<ag-checkbox disabled="true"></ag-checkbox>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind disabled', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      expect(checkboxDebugger.componentInstance.disabled).toBe(true);
      expect(checkboxDebugger.nativeElement.querySelector('input').disabled).toBe(true);
    });

    it('should prevent any change', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      click(checkboxDebugger.nativeElement.querySelector('label'));
      hostFixture.detectChanges();
      expect(checkboxDebugger.nativeElement.querySelector('input').disabled).toBe(true);
      expect(checkboxDebugger.nativeElement.querySelector('input').checked).toBe(false);
    });
  });

  describe('(change)', () => {
    @Component({
      template: '<ag-checkbox name="nome" value="valore" (change)="onChangeCheckbox($event)"></ag-checkbox>',
    })
    class TestHostComponent {
      checkboxEvent: Event;

      onChangeCheckbox(e: Event) {
        this.checkboxEvent = e;
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should emit changes', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      spyOn(hostFixture.componentInstance, 'onChangeCheckbox').and.callThrough();
      click(checkboxDebugger.nativeElement.querySelector('label'));
      expect(hostFixture.componentInstance.onChangeCheckbox).toHaveBeenCalled();
      expect(hostFixture.componentInstance.onChangeCheckbox.calls.count()).toBe(1);
      expect(hostFixture.componentInstance.checkboxEvent.target).toEqual(
        jasmine.objectContaining({
          name: 'nome',
          value: 'valore',
          checked: true,
        })
      );
    });
  });

  describe('[formControl]', () => {
    @Component({
      template: `
        <form [formGroup]="form" novalidate>
          <div formGroupName="item">
            <select formControlName="language" (change)="onChangeLanguage($event.target.value)">
              <option *ngFor="let option of selectOptions" [value]="option.id">{{option.label}}</option>
            </select>
            <div formGroupName="translations">
              <div [formGroup]="form.get('item.translations.'+ form.value.item.language)">
                <ag-checkbox
                  [formControl]="form.get('item.translations.'+ form.value.item.language +'.hasFlag')">
                </ag-checkbox>
                <input type="text" formControlName="value">
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
        return this.fb.group({hasFlag: [false], value: ['']});
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should change form value', () => {
      hostFixture.detectChanges();
      checkboxDebugger = getCheckboxDebugger();
      const inputDOM = getChildDebugElement('input[type="text"]').from(hostFixture);
      const selectDOM = getChildDebugElement('select').from(hostFixture);
      click(checkboxDebugger.nativeElement.querySelector('label'));
      console.log(checkboxDebugger.componentInstance);
      updateValueOfInput(inputDOM.nativeElement, 'Foo', hostFixture).catch(console.log);
      expect(checkboxDebugger.componentInstance.checked).toBe(true);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
          },
          language: 'en',
        },
      });

      updateValueOfSelect(selectDOM.nativeElement, 'it', hostFixture).catch(console.log);
      expect(checkboxDebugger.componentInstance.checked).toBe(false);
      expect(inputDOM.nativeElement.value).toBe('');
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
            it: {hasFlag: false, value: ''},
          },
          language: 'it',
        },
      });

      click(checkboxDebugger.nativeElement.querySelector('label'));
      updateValueOfInput(inputDOM.nativeElement, 'Bar', hostFixture).catch(console.log);
      expect(checkboxDebugger.componentInstance.checked).toBe(true);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
            it: {hasFlag: true, value: 'Bar'},
          },
          language: 'it',
        },
      });

      click(checkboxDebugger.nativeElement.querySelector('label'));
      updateValueOfInput(inputDOM.nativeElement, 'Baz', hostFixture).catch(console.log);
      expect(checkboxDebugger.componentInstance.checked).toBe(false);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
            it: {hasFlag: false, value: 'Baz'},
          },
          language: 'it',
        },
      });

      updateValueOfSelect(selectDOM.nativeElement, 'en', hostFixture).catch(console.log);
      expect(checkboxDebugger.componentInstance.checked).toBe(true);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
            it: {hasFlag: false, value: 'Baz'},
          },
          language: 'en',
        },
      });
    });
  });
});
