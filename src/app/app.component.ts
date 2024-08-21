import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from './store/store.service';
import { Subscription } from 'rxjs';
import { Dessert } from './models/image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  desserts: Dessert[] = [];
  cart: Dessert[] = [];
  incrementStates: { [key: number]: boolean } = {};
  quantityStates: { [key: number]: number } = {};

  singleDessert: Dessert | undefined;

  isModalVisible: boolean = false;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store.init();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.store.desserts$.subscribe((data) => {
        this.desserts = data;
      })
    );
    this.subscriptions.add(
      this.store.cart$.subscribe((cart) => {
        this.cart = cart;
      })
    );
    this.singleDessert = this.desserts[0];
    console.log('single desserts in app: ', this.singleDessert);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleAddToCart(dessert: Dessert) {
    this.store.addToCart(dessert);
    this.incrementStates[dessert.id] = true;
    this.quantityStates[dessert.id] =
      (this.quantityStates[dessert.id] || 0) + 1;
  }

  handleRemoveFromCart(dessert: Dessert) {
    this.store.removeFromCart(dessert);
    delete this.incrementStates[dessert.id];
    delete this.quantityStates[dessert.id];
  }

  handleIncrementQuantity(dessert: any) {
    if (this.quantityStates[dessert.id] !== undefined) {
      this.quantityStates[dessert.id] += 1; // Increment quantity
    }
  }

  handleDecrementQuantity(dessert: Dessert) {
    if (
      this.quantityStates[dessert.id] !== undefined &&
      this.quantityStates[dessert.id] > 0
    ) {
      this.quantityStates[dessert.id] -= 1; // Decrement quantity
      console.log('desert and quantity: ', dessert, this.quantityStates);
      if (this.quantityStates[dessert.id] === 0) {
        this.store.removeFromCart(dessert);
        delete this.quantityStates[dessert.id];
        delete this.incrementStates[dessert.id];
      }
    }
  }

  calculateTotalPrice(dessert: Dessert): number {
    return dessert.price * (this.quantityStates[dessert.id] || 0);
  }

  calculateOrderTotal(): number {
    return this.cart.reduce((total, dessert) => total + this.calculateTotalPrice(dessert), 0);
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.cart = [];
    this.incrementStates = {};
    this.quantityStates = {};
    this.store.resetCart();
  }

  getCartCount(): number {
    return this.store.getCartCount();
  }
}
