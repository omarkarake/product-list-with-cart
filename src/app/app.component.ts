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

    // Retrieve data from localStorage
    const storedDesserts = localStorage.getItem('desserts');
    const storedCart = localStorage.getItem('cart');
    const storedIncrementStates = localStorage.getItem('incrementStates');
    const storedQuantityStates = localStorage.getItem('quantityStates');

    if (storedDesserts) {
      this.desserts = JSON.parse(storedDesserts);
    }
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    if (storedIncrementStates) {
      this.incrementStates = JSON.parse(storedIncrementStates);
    }
    if (storedQuantityStates) {
      this.quantityStates = JSON.parse(storedQuantityStates);
    }

    if (this.desserts.length > 0) {
      this.singleDessert = this.desserts[0];
    }
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.store.desserts$.subscribe((data) => {
        this.desserts = data;
        this.updateLocalStorage();
      })
    );
    this.subscriptions.add(
      this.store.cart$.subscribe((cart) => {
        this.cart = cart;
        this.updateLocalStorage();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleAddToCart(dessert: Dessert) {
    this.store.addToCart(dessert);
    this.incrementStates[dessert.id] = true;
    this.quantityStates[dessert.id] =
    (this.quantityStates[dessert.id] || 0) + 1;
    this.updateLocalStorage();
  }

  handleRemoveFromCart(dessert: Dessert) {
    this.store.removeFromCart(dessert);
    delete this.incrementStates[dessert.id];
    delete this.quantityStates[dessert.id];
    this.updateLocalStorage();
  }

  handleIncrementQuantity(dessert: Dessert) {
    if (this.quantityStates[dessert.id] !== undefined) {
      this.quantityStates[dessert.id] += 1; // Increment quantity
      this.updateLocalStorage();
    }
  }

  handleDecrementQuantity(dessert: Dessert) {
    if (
      this.quantityStates[dessert.id] !== undefined &&
      this.quantityStates[dessert.id] > 0
    ) {
      this.quantityStates[dessert.id] -= 1; // Decrement quantity
      if (this.quantityStates[dessert.id] === 0) {
        this.store.removeFromCart(dessert);
        delete this.quantityStates[dessert.id];
        delete this.incrementStates[dessert.id];
      }
      this.updateLocalStorage();
    }
  }

  calculateTotalPrice(dessert: Dessert): number {
    return dessert.price * (this.quantityStates[dessert.id] || 0);
  }

  calculateOrderTotal(): number {
    return this.cart.reduce(
      (total, dessert) => total + this.calculateTotalPrice(dessert),
      0
    );
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
    this.updateLocalStorage();
  }

  closeModalOnly() {
    this.isModalVisible = false;
  }

  getCartCount(): number {
    return this.store.getCartCount();
  }

  updateLocalStorage() {
    localStorage.setItem('desserts', JSON.stringify(this.desserts));
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem(
      'incrementStates',
      JSON.stringify(this.incrementStates)
    );
    localStorage.setItem('quantityStates', JSON.stringify(this.quantityStates));
  }
}
