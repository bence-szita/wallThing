import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCoreComponent } from './app-core/app-core.component';
import { ImageBrowserComponent } from './image-browser/image-browser.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { ImageUploadComponent } from './image-upload/image-upload.component'

@NgModule({
  declarations: [
    AppComponent,
    AppCoreComponent,
    ImageBrowserComponent,
    ImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
