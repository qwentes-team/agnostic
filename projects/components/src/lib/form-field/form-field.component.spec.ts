import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {FormFieldComponent} from './form-field.component';
import {getChildDebugElement} from '../../test.shared';

const SELECTOR = {
  LABEL: '.ag-form-field__label',
  META_LABEL: '.ag-form-field__meta-label',
  CONTENT: '.ag-form-field__content',
};

describe('FormFieldComponent', () => {
  let hostFixture: ComponentFixture<any>;
  let hostComponent: any;
  let hostElement: HTMLElement;
  let formFieldDebugger: DebugElement;

  const setupBeforeEachTestWithHostComponent = HostComponentClass => {
    TestBed.configureTestingModule({
      declarations: [FormFieldComponent, HostComponentClass],
    });
    hostFixture = TestBed.createComponent(HostComponentClass);
    hostComponent = hostFixture.componentInstance;
    hostElement = hostFixture.nativeElement;
  };

  const getFormFieldDebugger = () => getChildDebugElement('ag-form-field').from(hostFixture);

  afterEach(() => {
    if (hostFixture && hostFixture.destroy) {
      hostFixture.destroy();
    }
    hostFixture = null;
    hostComponent = null;
    hostElement = null;
    formFieldDebugger = null;
  });

  @Component({
    template: `
      <ag-form-field [label]="label" [metaLabel]="metaLabel">Foo!</ag-form-field>
    `,
  })
  class TestHostComponent {
    label: string;
    metaLabel: string;
  }

  beforeEach(() => setupBeforeEachTestWithHostComponent(TestHostComponent));

  it('should render transcluded content', () => {
    hostFixture.detectChanges();
    formFieldDebugger = getFormFieldDebugger();
    const defaultTransclude = formFieldDebugger.nativeElement.querySelector(SELECTOR.CONTENT);
    expect(defaultTransclude.innerText).toBe('Foo!');
  });

  it('should render label prop', () => {
    hostFixture.componentInstance.label = 'My Label!';
    hostFixture.detectChanges();
    formFieldDebugger = getFormFieldDebugger();
    const propContainerDOM = formFieldDebugger.nativeElement.querySelector(SELECTOR.LABEL);
    expect(propContainerDOM.innerText).toBe('My Label!');
    expect(formFieldDebugger.nativeElement.querySelector(SELECTOR.META_LABEL)).toBeNull();
  });

  it('should render metaLabel prop', () => {
    hostFixture.componentInstance.metaLabel = 'My meta label!';
    hostFixture.detectChanges();
    formFieldDebugger = getFormFieldDebugger();
    const propContainerDOM = formFieldDebugger.nativeElement.querySelector(SELECTOR.META_LABEL);
    expect(propContainerDOM.innerText).toBe('My meta label!');
    expect(formFieldDebugger.nativeElement.querySelector(SELECTOR.LABEL)).toBeNull();
  });

  it('should render label and metaLabel prop', () => {
    hostFixture.componentInstance.label = 'My label!';
    hostFixture.componentInstance.metaLabel = 'My meta label!';
    hostFixture.detectChanges();
    formFieldDebugger = getFormFieldDebugger();
    const selectorDOM = formFieldDebugger.nativeElement;
    expect(selectorDOM.querySelector(SELECTOR.LABEL).innerText).toBe('My label!');
    expect(selectorDOM.querySelector(SELECTOR.META_LABEL).innerText).toBe('My meta label!');
  });
});
