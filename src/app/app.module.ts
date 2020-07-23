import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCoreComponent } from './app-core/app-core.component';
import { ImageBrowserComponent } from './image-browser/image-browser.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { BorderPickerComponent } from './border-picker/border-picker.component'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AppCoreComponent,
    ImageBrowserComponent,
    ImageUploadComponent,
    BorderPickerComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
