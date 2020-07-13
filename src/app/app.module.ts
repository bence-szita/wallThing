import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCoreComponent } from './app-core/app-core.component';
import { ImageBrowserComponent } from './image-browser/image-browser.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service'

@NgModule({
  declarations: [
    AppComponent,
    AppCoreComponent,
    ImageBrowserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
