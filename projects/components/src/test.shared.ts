import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

export const getChildDebugElement = selector => ({
  from: hostFixture => hostFixture.debugElement.query(By.css(selector)),
});

export const ButtonClickEvents = {
  left: {button: 0},
  right: {button: 2},
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

export async function updateValueOfInput(element: HTMLInputElement | HTMLSelectElement, value: string, fixture) {
  element.value = value;
  element.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  return await fixture.whenStable();
}

export async function updateValueOfSelect(element: HTMLSelectElement, value: string, fixture) {
  element.value = value;
  element.dispatchEvent(new Event('change'));
  fixture.detectChanges();
  return await fixture.whenStable();
}
