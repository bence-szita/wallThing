import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { DataService} from '../services/data.service';
import { AppCoreComponent } from '../app-core/app-core.component';

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.css']
})
export class ImageBrowserComponent implements OnInit {
  @Output() newImage = new EventEmitter<object>();
  @Output() zoomChange = new EventEmitter<number>();

  searchInputForGallery : string;
  APIKEY : string;
  url : string;
  queryUrl : string;
  imageList: any;
  private appCore: AppCoreComponent;


  changeImage(e){
    console.log(e.target.src);
    /* this.appCore._drawImage(e.target.src); */
    this.newImage.emit(e.target.src)
  }

  increaseZoom(e){
    console.log("increase");
    /* this.appCore._drawImage(e.target.src); */
    this.zoomChange.emit(+0.05)
    
  }

  decreaseZoom(e){
    console.log("derease");
    /* this.appCore._drawImage(e.target.src); */
    this.zoomChange.emit(-0.05);
  }



  constructor( private dataService: DataService) {
    this.searchInputForGallery = 'festival';
    this.APIKEY = "mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";  
    this.url = "https://api.unsplash.com/search/photos?page=1&query=gorilla&client_id=mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";
    this.queryUrl = "https://api.unsplash.com/search/photos?page=1&query=" + this.searchInputForGallery + "&client_id=" + this.APIKEY;
  }


  ngOnInit() {
    this.dataService.getRemoteData(this.queryUrl).subscribe(data => {
      this.imageList = data;

    });


  }


  
  

}
