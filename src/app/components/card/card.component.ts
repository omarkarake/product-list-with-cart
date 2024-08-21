import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dessert } from '../../models/image.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() singleDessert: Dessert | undefined;
  @Input() incrementState: boolean = false;
  @Input() quantityState: number = 0;

  @Output() addToCart = new EventEmitter<void>();
  @Output() incrementQuantity = new EventEmitter<void>();
  @Output() decrementQuantity = new EventEmitter<void>();

  addToCartActive() {
    this.addToCart.emit();
  }

  incrementQuantityHandler(event: Event) {
    event.stopPropagation();
    this.incrementQuantity.emit();
  }

  decrementQuantityHandler(event: Event) {
    event.stopPropagation();
    this.decrementQuantity.emit();
  }
}