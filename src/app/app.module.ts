import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { OrderconfirmModalComponent } from './components/orderconfirm-modal/orderconfirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    OrderconfirmModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
