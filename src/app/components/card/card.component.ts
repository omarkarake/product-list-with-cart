import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { Subscription } from 'rxjs';
import { Dessert } from '../../models/image.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  desserts: Dessert[] = [];
  singleDessert: Dessert | undefined;
  incrementState: boolean = false;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.desserts$.subscribe((data) => {
        this.desserts = data;
        this.singleDessert = this.desserts[0];
        console.log('data: ', this.singleDessert);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addToCartActive() {
    this.incrementState = true;
    console.log('incrementState: ', this.incrementState);
  }
}
