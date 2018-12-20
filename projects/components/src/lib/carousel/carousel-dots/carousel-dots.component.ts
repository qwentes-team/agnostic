import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
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
export class CarouselDotsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() totalDots: number;
  @Input() currentDot: number;

  public dots: number[];
  private dotsInViewport: number;
  private dotsInGhost: number;
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

  public ngOnInit() {}

  public ngAfterViewInit(): void {
    this.containerElement = this.componentElement.querySelector(CSS_CLASS.DOTS);
    this.dotListElements = this.containerElement.children;
    this.cd.detectChanges();
    this.setDotsClasses(this.currentDot);
  }

  public ngOnChanges({totalDots, currentDot}: SimpleChanges): void {
    if (totalDots) {
      this.dots = this.createDotsArray(totalDots.currentValue);
      this.dotsInViewport = this.getDotsInViewport();
      this.dotsInGhost = this.getDotsInGhost();
    }
    if (currentDot && !currentDot.isFirstChange()) {
      const currentPosition = currentDot.currentValue;
      this.setDotsClasses(currentPosition);
      if (this.shouldTranslateDots()) {
        this.translateDotsTo(currentPosition);
      }
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

  private shouldTranslateDots(): boolean {
    return this.currentDot + 1 >= this.dotsInViewport;
  }

  private resetAllDotsClasses(): void {
    for (let i = 0; i < this.dotListElements.length; i++) {
      const el = this.dotListElements[i];
      el.classList.remove(CSS_CLASS.CURRENT);
      el.classList.remove(CSS_CLASS.VIEWPORT);
      el.classList.remove(CSS_CLASS.GHOST);
    }
  }

  private setDotViewportClasses(fromIndex, toIndex) {
    for (let i = fromIndex; i < toIndex; i++) {
      this.dotListElements[i].classList.add(CSS_CLASS.VIEWPORT);
    }
  }

  private setDotDynamicClasses(nextPosition): void {
    if (this.isAbsoluteGhostDot(nextPosition)) {
      this.setAbsoluteDotGhostClasses();
      this.setDotViewportClasses(0, this.dotsInViewport);
    } else {
      const initialPrevGhostIndex = nextPosition - this.dotsInViewport;
      const initialNextGhostIndex = nextPosition + 1;
      this.setRelativeDotGhostClasses(initialPrevGhostIndex, initialNextGhostIndex);
      this.setDotViewportClasses(initialPrevGhostIndex + 1, initialNextGhostIndex);
    }
  }

  private setRelativeDotGhostClasses(initialPrevGhostIndex, initialNextGhostIndex): void {
    this.addGhostClass(this.dotListElements[initialPrevGhostIndex]);
    this.addGhostClass(this.dotListElements[initialNextGhostIndex]);
  }

  private setAbsoluteDotGhostClasses(): void {
    this.addGhostClass(this.dotListElements[this.dotsInViewport]);
  }

  private addGhostClass(element: Element): void {
    if (element) {
      element.classList.add(CSS_CLASS.GHOST);
    }
  }

  private setDotsClasses(nextPosition): void {
    this.resetAllDotsClasses();
    this.setCurrentDotClass(nextPosition);
    this.setDotDynamicClasses(nextPosition);
  }

  private setCurrentDotClass(nextPosition: number): void {
    const currentElement = this.dotListElements[nextPosition];
    currentElement.classList.add(CSS_CLASS.CURRENT);
  }

  private isAbsoluteGhostDot(nextPosition): boolean {
    return nextPosition < this.dotsInViewport;
  }

  private translateDotsTo(nextPosition: number): void {
    const ratio = nextPosition - this.dotsInViewport + 1;
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
