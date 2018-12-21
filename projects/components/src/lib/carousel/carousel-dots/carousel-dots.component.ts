import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

const CSS_CLASS = {
  DOT: '.ag-carousel__dot',
  DOTS: '.ag-carousel-dots',
  VIEWPORT: 'ag-carousel__dot--in-viewport',
  GHOST: 'ag-carousel__dot--ghost',
  CURRENT: 'ag-carousel__dot--current',
};

@Component({
  selector: 'ag-carousel-dots',
  templateUrl: './carousel-dots.component.html',
  styleUrls: ['./carousel-dots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselDotsComponent implements OnChanges, AfterViewInit {
  @Input() totalDots: number;
  @Input() currentDot: number;

  public dots: number[];
  private dotsInViewport: number;
  private dotsInGhost: number; // TODO ?
  private dotSize: number;
  private prevPosition = 0;
  private containerElement: HTMLElement;
  private dotListElements: HTMLCollection;
  private readonly componentElement: HTMLElement;
  private readonly componentElementStyle: CSSStyleDeclaration;

  constructor(private cd: ChangeDetectorRef, private elementRef: ElementRef) {
    this.cd.detach();
    this.componentElement = this.elementRef.nativeElement;
    this.componentElementStyle = window.getComputedStyle(this.componentElement);
  }

  public ngAfterViewInit(): void {
    this.containerElement = this.componentElement.querySelector(CSS_CLASS.DOTS);
    this.dotListElements = this.containerElement.children;
    this.cd.detectChanges();
    this.updateDots(this.currentDot);
  }

  public ngOnChanges({totalDots, currentDot}: SimpleChanges): void {
    if (totalDots) {
      this.dots = this.createDotsArray(totalDots.currentValue);
      this.dotsInViewport = this.getDotsInViewport();
      this.dotsInGhost = this.getDotsInGhost();
    }
    if (currentDot && !currentDot.isFirstChange()) {
      const currentPosition = currentDot.currentValue;
      this.updateDots(currentPosition);
      this.prevPosition = currentPosition;
    }
  }

  public trackByFn(index, element): number {
    return index;
  }

  private createDotsArray(quantity) {
    return Array.from(new Array(quantity)).map((n, i) => i);
  }

  private getDotsInViewport(): number {
    return +this.componentElementStyle.getPropertyValue('--ag-carousel-dots-in-viewport');
  }

  private getDotsInGhost(): number {
    return +this.componentElementStyle.getPropertyValue('--ag-carousel-dots-in-ghost');
  }

  private setDotViewportClasses(newFrom, newTo) {
    document.querySelectorAll(`.${CSS_CLASS.VIEWPORT}`).forEach(el => {
      this.removeClass(CSS_CLASS.VIEWPORT, el);
    });
    for (let i = newFrom; i < newTo; i++) {
      this.addClass(CSS_CLASS.VIEWPORT, this.dotListElements[i]);
    }
  }

  private moveDots(nextPosition): void {
    const isLeftDirection = nextPosition - this.prevPosition < 0;
    isLeftDirection ? this.moveDotsToLeft(nextPosition) : this.moveDotsToRight(nextPosition);
  }

  private shouldPreventRightMovement(nextPosition): boolean {
    const nextElement = this.dotListElements[nextPosition].nextElementSibling;
    const nextElementIsViewport = nextElement && nextElement.classList.contains(CSS_CLASS.VIEWPORT);
    return nextPosition < this.dotsInViewport || nextElementIsViewport;
  }

  private moveDotsToRight(nextPosition: number): void {
    if (nextPosition === 0) {
      return this.setAsInitDots(nextPosition);
    } else if (this.shouldPreventRightMovement(nextPosition)) {
      return;
    }
    const newFrom = nextPosition - this.dotsInViewport;
    const newTo = nextPosition + 1;
    this.setDotGhostClasses(newFrom, newTo);
    this.setDotViewportClasses(newFrom + 1, newTo);
    this.translateDotsTo(nextPosition);
  }

  private canDoLeftMovement(prevElement): boolean {
    return (
      prevElement &&
      !prevElement.classList.contains(CSS_CLASS.GHOST) &&
      !prevElement.classList.contains(CSS_CLASS.VIEWPORT)
    );
  }

  private moveDotsToLeft(nextPosition: number) {
    const prevElement = this.dotListElements[nextPosition].previousElementSibling;
    if (!prevElement) {
      this.setAsInitDots(nextPosition);
      this.translateDotsTo(nextPosition);
    } else if (this.canDoLeftMovement(prevElement)) {
      this.setDotGhostClasses(nextPosition - 1, this.prevPosition + (this.dotsInViewport - 1));
      this.setDotViewportClasses(nextPosition, nextPosition + this.dotsInViewport);
      const delta = this.dotsInViewport - this.dotsInGhost;
      const translation = this.prevPosition + delta + Math.ceil(this.dotsInViewport / 2) - this.dotsInGhost;
      console.log(translation);
      this.translateDotsTo(nextPosition - 1, true);
    }
  }

  private setAsInitDots(nextPosition) {
    const newFrom = nextPosition - this.dotsInViewport + 1;
    const newTo = nextPosition + this.dotsInViewport;
    this.setDotGhostClasses(newFrom, newTo);
    this.setDotViewportClasses(nextPosition, nextPosition + this.dotsInViewport);
  }

  private setDotGhostClasses(newFrom, newTo): void {
    document.querySelectorAll(`.${CSS_CLASS.GHOST}`).forEach(el => {
      this.removeClass(CSS_CLASS.GHOST, el);
    });
    this.addClass(CSS_CLASS.GHOST, this.dotListElements[newFrom]);
    this.addClass(CSS_CLASS.GHOST, this.dotListElements[newTo]);
  }

  private addClass(className: string, element: Element): void {
    this.updateClassElement('add', className, element);
  }

  private removeClass(className: string, element: Element): void {
    this.updateClassElement('remove', className, element);
  }

  private updateClassElement(updateType: 'add' | 'remove', className: string, element: Element): void {
    if (element) {
      element.classList[updateType](className);
    }
  }

  private updateDots(nextPosition): void {
    this.setCurrentDot(nextPosition);
    this.moveDots(nextPosition);
  }

  private setCurrentDot(nextPosition: number): void {
    this.removeClass(CSS_CLASS.CURRENT, this.dotListElements[this.prevPosition]);
    this.addClass(CSS_CLASS.CURRENT, this.dotListElements[nextPosition]);
  }

  private translateDotsTo(nextPosition: number, isLeft?: boolean): void {
    if (isLeft ? nextPosition === -1 : nextPosition === 0) {
      this.containerElement.style.transform = `translateX(${nextPosition}px)`;
      return;
    }
    const canMove = (isLeft ? nextPosition + this.dotsInViewport : nextPosition) + 1 >= this.dotsInViewport;
    if (!canMove) {
      return;
    }
    const ratio = (isLeft ? nextPosition : nextPosition - this.dotsInViewport) + 1;
    const movement = this.getDotSize() * ratio;
    this.containerElement.style.transform = `translateX(${-movement}px)`;
  }

  private getDotSize(): number {
    if (this.dotSize) {
      return this.dotSize;
    }
    const dot = this.componentElement.querySelector(CSS_CLASS.DOT);
    const style = window.getComputedStyle(dot);
    this.dotSize = parseInt(style.width, 10) + parseInt(style.margin, 10) * 2;
    return this.dotSize;
  }
}
