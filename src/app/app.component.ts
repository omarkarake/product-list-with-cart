import { Component, OnInit } from '@angular/core';
import { StoreService } from './store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'productListWithCart';
  constructor(private store: StoreService) {}
  ngOnInit(): void {
    this.store.init();
  }
}
