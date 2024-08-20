import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.desserts$.subscribe((data) => {
        console.log("data: ", data);
      })
    );
  }
}
