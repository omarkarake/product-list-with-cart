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
  incrementState: boolean = false;
  quantityState: number = 0;

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
  }

  handleIncrementQuantity(dessert: any) {
    // Handle increment quantity logic
  }

  handleDecrementQuantity(dessert: any) {
    // Handle decrement quantity logic
  }

  handleRemoveFromCart(dessert: Dessert) {
    this.store.removeFromCart(dessert);
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  getCartCount(): number {
    return this.store.getCartCount();
  }

  calculateTotal(){
    return this.cart.reduce((acc, dessert) => {
      return acc + dessert.price;
    }, 0);
  }
}