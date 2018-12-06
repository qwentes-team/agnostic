import {Component, DebugElement, OnInit} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ToggleComponent} from './toggle.component';
import {click, getChildDebugElement, updateValueOfInput, updateValueOfSelect} from '../../test.shared';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

describe('ToggleComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let toggleDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ToggleComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getToggleDebugger = () => getChildDebugElement('ag-toggle').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    toggleDebugger = null;
  });

  describe('default values', () => {
    @Component({template: '<ag-toggle></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should has default [type]', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const childComponent = toggleDebugger.componentInstance;
      const childInput: HTMLElement = toggleDebugger.nativeElement.querySelector('input');
      expect(childComponent.type).toBe('checkbox');
      expect(childInput.getAttribute('type')).toBe('checkbox');
    });

    it('should has default [theme]', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const childComponent = toggleDebugger.componentInstance;
      expect(childComponent.theme).toBe('material');
      expect(toggleDebugger.nativeElement.getAttribute('theme')).toBe('material');
    });

    it('should has default [position]', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const childComponent = toggleDebugger.componentInstance;
      expect(childComponent.position).toBe('before');
      expect(toggleDebugger.nativeElement.getAttribute('position')).toBe('before');
    });
  });

  describe('[name]', () => {
    @Component({template: '<ag-toggle name="foo"></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding name', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.name).toBe('foo');
      expect(toggleDebugger.nativeElement.querySelector('input').getAttribute('name')).toBe('foo');
    });
  });

  describe('[value]', () => {
    @Component({template: '<ag-toggle value="bar"></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding value', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.value).toBe('bar');
      expect(toggleDebugger.nativeElement.querySelector('input').value).toBe('bar');
    });
  });

  describe('[checked]', () => {
    @Component({template: '<ag-toggle checked="true"></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding checked', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.checked).toBe(true);
      expect(toggleDebugger.nativeElement.querySelector('input').checked).toBe(true);
    });
  });

  describe('[disabled]', () => {
    @Component({template: '<ag-toggle disabled="true"></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding disabled', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.disabled).toBe(true);
      expect(toggleDebugger.nativeElement.querySelector('input').disabled).toBe(true);
    });

    it('should has disabled class', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      const toggleElement: HTMLElement = toggleDebugger.nativeElement;
      const toggleContainer: HTMLElement = toggleElement.querySelector('.ag-toggle');
      expect(toggleContainer.classList.contains('ag-toggle--disabled')).toBe(true);
    });

    it('should prevent checked changes', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      click(toggleDebugger.nativeElement.querySelector('label'));
      hostFixture.detectChanges();
      expect(toggleDebugger.nativeElement.querySelector('input').disabled).toBe(true);
      expect(toggleDebugger.nativeElement.querySelector('input').checked).toBe(false);
    });
  });

  describe('[required]', () => {
    @Component({template: '<ag-toggle required="true"></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding required', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.required).toBe(true);
      expect(toggleDebugger.nativeElement.querySelector('input').required).toBe(true);
    });
  });

  describe('[type]', () => {
    @Component({template: '<ag-toggle type="radio"></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding type', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.type).toBe('radio');
      expect(toggleDebugger.nativeElement.querySelector('input').type).toBe('radio');
    });
  });

  describe('[theme]', () => {
    @Component({template: '<ag-toggle theme="ios"></ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding theme', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.theme).toBe('ios');
      expect(toggleDebugger.nativeElement.getAttribute('theme')).toBe('ios');
    });
  });

  describe('[position]', () => {
    @Component({template: '<ag-toggle position="after">Test</ag-toggle>'})
    class TestHostComponent {}

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should binding position', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      expect(toggleDebugger.componentInstance.position).toBe('after');
      expect(toggleDebugger.nativeElement.getAttribute('position')).toBe('after');
    });
  });

  describe('(change)', () => {
    @Component({
      template: '<ag-toggle name="test" value="foo" (change)="onChangeToggle($event)"></ag-toggle>',
    })
    class TestHostComponent {
      toggleEvent: Event;

      onChangeToggle(e: Event) {
        this.toggleEvent = e;
      }
    }

    beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

    it('should emit changes', () => {
      hostFixture.detectChanges();
      toggleDebugger = getToggleDebugger();
      spyOn(hostFixture.componentInstance, 'onChangeToggle').and.callThrough();
      click(toggleDebugger.nativeElement.querySelector('label'));
      expect(hostFixture.componentInstance.onChangeToggle).toHaveBeenCalled();
      expect(hostFixture.componentInstance.onChangeToggle.calls.count()).toBe(1);
      expect(hostFixture.componentInstance.toggleEvent.target).toEqual(
        jasmine.objectContaining({
          name: 'test',
          value: 'foo',
          checked: true,
        })
      );
    });
  });

  fdescribe('[formControl]', () => {
    @Component({
      template: `
        <form [formGroup]="form" novalidate>
          <div formGroupName="item">
            <select formControlName="language" (change)="onChangeLanguage($event.target.value)">
              <option *ngFor="let option of selectOptions" [value]="option.id">{{option.label}}</option>
            </select>
            <div formGroupName="translations">
              <div [formGroup]="form.get('item.translations.'+ form.value.item.language)">
                <ag-toggle
                  [formControl]="form.get('item.translations.'+ form.value.item.language +'.hasFlag')">
                </ag-toggle>
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
      toggleDebugger = getToggleDebugger();
      const inputDOM = getChildDebugElement('input[type="text"]').from(hostFixture);
      const selectDOM = getChildDebugElement('select').from(hostFixture);
      click(toggleDebugger.nativeElement.querySelector('label'));
      updateValueOfInput(inputDOM.nativeElement, 'Foo', hostFixture).catch(console.log);
      expect(toggleDebugger.componentInstance.checked).toBe(true);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
          },
          language: 'en',
        },
      });

      updateValueOfSelect(selectDOM.nativeElement, 'it', hostFixture).catch(console.log);
      expect(toggleDebugger.componentInstance.checked).toBe(false);
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

      click(toggleDebugger.nativeElement.querySelector('label'));
      updateValueOfInput(inputDOM.nativeElement, 'Bar', hostFixture).catch(console.log);
      expect(toggleDebugger.componentInstance.checked).toBe(true);
      expect(hostFixture.componentInstance.form.value).toEqual({
        item: {
          translations: {
            en: {hasFlag: true, value: 'Foo'},
            it: {hasFlag: true, value: 'Bar'},
          },
          language: 'it',
        },
      });

      click(toggleDebugger.nativeElement.querySelector('label'));
      updateValueOfInput(inputDOM.nativeElement, 'Baz', hostFixture).catch(console.log);
      expect(toggleDebugger.componentInstance.checked).toBe(false);
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
      expect(toggleDebugger.componentInstance.checked).toBe(true);
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
