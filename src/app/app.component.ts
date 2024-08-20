import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StoreService } from './store/store.service';
import { Subscription } from 'rxjs';
import { Dessert } from './models/image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  private subscriptions: Subscription = new Subscription();
  desserts: Dessert[] = [];
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
    this.singleDessert = this.desserts[0];
    console.log('single desserts in app: ', this.singleDessert);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleAddToCart(dessert: any) {
    // Handle add to cart logic
  }

  handleIncrementQuantity(dessert: any) {
    // Handle increment quantity logic
  }

  handleDecrementQuantity(dessert: any) {
    // Handle decrement quantity logic
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
