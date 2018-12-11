import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RadioComponent} from './radio.component';
import {Component, DebugElement, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {click, getChildDebugElement, updateValueOfInput} from '../../test.shared';

describe('RadioComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let radioDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RadioComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getRadioDebugger = () => getChildDebugElement('ag-radio').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    radioDebugger = null;
  });

  describe('[name]', () => {
    @Component({template: '<ag-radio name="nome"></ag-radio>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind name', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioDebugger();
      expect(radioDebugger.componentInstance.name).toBe('nome');
      expect(radioDebugger.nativeElement.querySelector('input').getAttribute('name')).toBe('nome');
    });
  });

  describe('[value]', () => {
    @Component({template: '<ag-radio value="valore"></ag-radio>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind value', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioDebugger();
      expect(radioDebugger.componentInstance.value).toBe('valore');
      expect(radioDebugger.nativeElement.querySelector('input').getAttribute('value')).toBe('valore');
    });
  });

  describe('[required]', () => {
    @Component({template: '<ag-radio required="true"></ag-radio>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind required', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioDebugger();
      expect(radioDebugger.componentInstance.required).toBe(true);
      expect(radioDebugger.nativeElement.querySelector('input').required).toBe(true);
    });
  });

  describe('[checked]', () => {
    @Component({template: '<ag-radio checked="true"></ag-radio>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind checked', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioDebugger();
      expect(radioDebugger.componentInstance.checked).toBe(true);
      expect(radioDebugger.nativeElement.querySelector('input').checked).toBe(true);
    });
  });

  describe('[disabled]', () => {
    @Component({template: '<ag-radio disabled="true"></ag-radio>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should bind disabled', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioDebugger();
      expect(radioDebugger.componentInstance.disabled).toBe(true);
      expect(radioDebugger.nativeElement.querySelector('input').disabled).toBe(true);
    });

    it('should prevent any change', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioDebugger();
      click(radioDebugger.nativeElement.querySelector('label'));
      hostFixture.detectChanges();
      expect(radioDebugger.nativeElement.querySelector('input').disabled).toBe(true);
      expect(radioDebugger.nativeElement.querySelector('input').checked).toBe(false);
    });
  });

  describe('(change)', () => {
    @Component({
      template: '<ag-radio name="nome" value="valore" (change)="onChangeRadio($event)"></ag-radio>',
    })
    class TestHostComponent {
      radioEvent: Event;

      onChangeRadio(e: Event) {
        this.radioEvent = e;
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should emit changes', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioDebugger();
      spyOn(hostFixture.componentInstance, 'onChangeRadio').and.callThrough();
      click(radioDebugger.nativeElement.querySelector('label'));
      expect(hostFixture.componentInstance.onChangeRadio).toHaveBeenCalled();
      expect(hostFixture.componentInstance.onChangeRadio.calls.count()).toBe(1);
      expect(hostFixture.componentInstance.radioEvent.target).toEqual(
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
                <ag-radio
                  id="bool-radio"
                  [formControl]="form.get('item.translations.'+ form.value.item.language +'.hasFlag')" [value]="true">
                </ag-radio>
                <ag-radio
                  id="string-radio"
                  [formControl]="form.get('item.translations.'+ form.value.item.language +'.hasFlag')" [value]="'test'">
                </ag-radio>
                <input type="text" formControlName="value">
              </div>
            </div>
          </div>
        </form>
        <div>{{form.value | json}}</div>
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

    const getRadioBooleanDebugger = () => getChildDebugElement('ag-radio#bool-radio').from(hostFixture);
    const getRadioStringDebugger = () => getChildDebugElement('ag-radio#string-radio').from(hostFixture);

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should change form value boolean', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioBooleanDebugger();
      const inputDOM = getChildDebugElement('input[type="text"]').from(hostFixture);
      click(radioDebugger.nativeElement.querySelector('label'));
      hostFixture.detectChanges();
      updateValueOfInput(inputDOM.nativeElement, 'Foo', hostFixture).catch(console.log);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
          },
          language: 'en',
        },
      });
    });

    it('should change form value string', () => {
      hostFixture.detectChanges();
      radioDebugger = getRadioStringDebugger();
      const inputDOM = getChildDebugElement('input[type="text"]').from(hostFixture);
      click(radioDebugger.nativeElement.querySelector('label'));
      hostFixture.detectChanges();
      updateValueOfInput(inputDOM.nativeElement, 'Foo', hostFixture).catch(console.log);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: 'test', value: 'Foo'},
          },
          language: 'en',
        },
      });
    });
  });
});
