import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { DataService} from '../services/data.service';
import { AppCoreComponent } from '../app-core/app-core.component';

@Component({
  selector: 'image-browser-unsplash',
  templateUrl: './image-browser-unsplash.component.html',
  styleUrls: ['./image-browser-unsplash.component.css']
})
export class ImageBrowserUnsplashComponent implements OnInit {
  @Output() newImage = new EventEmitter<object>();
  @Output() zoomChange = new EventEmitter<number>();

  APIKEY_UNSPLASH : string;
  url_UNSPLASH : string;
  queryUrl_UNSPLASH : string;
  imageList: any;
  private appCore: AppCoreComponent;
  searchString : string;
  pageNum : number;
  selectedIndex : number;

  changeImage(e){
    this.newImage.emit(e.target.src)
  }

  increaseZoom(e){

    this.zoomChange.emit(+0.05)
    
  }

  decreaseZoom(e){
    this.zoomChange.emit(-0.05);
  }


  constructor( private dataService: DataService) {
    this.searchString = 'abstract';
    this.APIKEY_UNSPLASH = "mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";  
    this.url_UNSPLASH = "https://api.unsplash.com/search/photos?page=1&query=gorilla&client_id=mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";
    this.pageNum = 1;
    this.queryUrl_UNSPLASH = "https://api.unsplash.com/search/photos?page=" + this.pageNum + "&query=" + this.searchString + "&client_id=" + this.APIKEY_UNSPLASH;
  }


  ngOnInit() {
    console.log("itt a")
    this.update_UNSPLASHGallery(); 
  }

  update_UNSPLASHGallery(){
    this.fill_UNSPLASHGallery( this.pageNum , this.searchString, this.APIKEY_UNSPLASH);
  }
  fill_UNSPLASHGallery( _page, _searchinput, _apikey){
    this.selectedIndex = null;
    this.queryUrl_UNSPLASH = "https://api.unsplash.com/search/photos?page=" + _page + "&query=" + _searchinput + "&client_id=" + _apikey;
    this.dataService.getRemoteData(this.queryUrl_UNSPLASH).subscribe(data => {
      this.imageList = data;
  });
  }


  nextPage(){
    this.pageNum += 1;
    this.fill_UNSPLASHGallery( this.pageNum, this.searchString, this.APIKEY_UNSPLASH);
  }
  previousPage(){
    this.pageNum -= 1;
    this.fill_UNSPLASHGallery( this.pageNum, this.searchString, this.APIKEY_UNSPLASH);
  }
  
  public highlightImage(_index: number) {
    this.selectedIndex = _index;
  }
  

}
