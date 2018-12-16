import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appCounterOf]'
})
export class CounterDirective implements OnChanges {

  constructor(private container: ViewContainerRef, private template: TemplateRef<Object>) {
  }

  @Input('appCounterOf') counter: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.container.clear();
    for (let i = 0; i < this.counter; i++) {
      this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
    }
  }
}

class CounterDirectiveContext {
  constructor(private $implicit: any) {}
}
