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

// import { Component, OnInit } from '@angular/core';
// import { StoreService } from '../../store/store.service';
// import { Subscription } from 'rxjs';
// import { Dessert } from '../../models/image.model';

// @Component({
//   selector: 'app-card',
//   templateUrl: './card.component.html',
//   styleUrl: './card.component.css',
// })
// export class CardComponent implements OnInit {
//   private subscriptions: Subscription = new Subscription();
//   desserts: Dessert[] = [];
//   singleDessert: Dessert | undefined;
//   incrementState: boolean = false;
//   quantityState: number = 0;

//   constructor(private store: StoreService) {}

//   ngOnInit(): void {
//     this.subscriptions.add(
//       this.store.desserts$.subscribe((data) => {
//         this.desserts = data;
//         this.singleDessert = this.desserts[0];
//         console.log('data: ', this.singleDessert);
//       })
//     );
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.unsubscribe();
//   }

//   addToCartActive() {
//     this.incrementState = true;
//     console.log('incrementState: ', this.incrementState);
//   }

//   incrementQuantity(event: any) {
//     event.stopPropagation();
//     this.quantityState++;
//     console.log('quantity state: ', this.quantityState);
//   }

//   decrementQuantity(event: any) {
//     event.stopPropagation();
//     this.quantityState--;
//     console.log('quantity state: ', this.quantityState);
//   }
// }
