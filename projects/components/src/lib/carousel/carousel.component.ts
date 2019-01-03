import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import Siema from 'siema';

export interface AgCarouselConfig {
  duration?: number;
  perPage?: number;
  startIndex?: number;
  draggable?: boolean;
  multipleDrag?: boolean;
  loop?: boolean;
  dots?: boolean;
}

export const CAROUSEL_SYMBOL = '[[CarouselSymbol]]';

export class AgCarousel {
  public readonly element: HTMLElement | Element;
  public readonly innerElements: HTMLElement[] | NodeList;
  public readonly currentIndex: number;
  private readonly [CAROUSEL_SYMBOL]: any;

  constructor(public type: 'init' | 'change', instance: any = {}) {
    this[CAROUSEL_SYMBOL] = instance;
    this.element = this[CAROUSEL_SYMBOL].selector;
    this.innerElements = this[CAROUSEL_SYMBOL].innerElements;
    this.currentIndex = this[CAROUSEL_SYMBOL].currentSlide;
  }

  public next() {
    this[CAROUSEL_SYMBOL].next();
  }

  public prev() {
    this[CAROUSEL_SYMBOL].prev();
  }

  public goTo(index: number): void {
    this[CAROUSEL_SYMBOL].goTo(index);
  }

  public destroy(): void {
    this[CAROUSEL_SYMBOL].destroy();
  }
}

@Component({
  selector: 'ag-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterContentInit, OnDestroy {
  public instance: any;

  @Input() public config: AgCarouselConfig = {};
  @Output() public init: EventEmitter<AgCarousel> = new EventEmitter();
  @Output() public change: EventEmitter<AgCarousel> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {
    this.cd.detach();
  }

  public ngAfterContentInit(): void {
    this.instance = new Siema({
      ...this.config,
      selector: '.ag-carousel',
      onChange: () => this.onChange(),
    });
    this.onInit();
  }

  private onInit(): void {
    this.cd.detectChanges();
    this.init.emit(this.createEvent('init'));
  }

  public onChange(): void {
    this.cd.detectChanges();
    this.change.emit(this.createEvent('change'));
  }

  private createEvent(type): AgCarousel {
    return new AgCarousel(type, this.instance);
  }

  public ngOnDestroy(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }
}
