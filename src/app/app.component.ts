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
  title = 'productListWithCart';
  private subscriptions: Subscription = new Subscription();
  desserts: Dessert[] = [];
  incrementState: boolean = false;
  quantityState: number = 0;

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
    console.log('desserts in app: ', this.desserts);
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
}
