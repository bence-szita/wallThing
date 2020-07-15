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
  searchString : string;
  pageNum : number;


  changeImage(e){

    /* this.appCore._drawImage(e.target.src); */
    this.newImage.emit(e.target.src)
  }

  increaseZoom(e){

    /* this.appCore._drawImage(e.target.src); */
    this.zoomChange.emit(+0.05)
    
  }

  decreaseZoom(e){

    /* this.appCore._drawImage(e.target.src); */
    this.zoomChange.emit(-0.05);
  }



  constructor( private dataService: DataService) {
    this.searchString = 'gorilla';
    this.APIKEY = "mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";  
    this.url = "https://api.unsplash.com/search/photos?page=1&query=gorilla&client_id=mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";
    this.pageNum = 1;
    this.queryUrl = "https://api.unsplash.com/search/photos?page=" + this.pageNum + "&query=" + this.searchInputForGallery + "&client_id=" + this.APIKEY;
  }


  ngOnInit() {
    this.updateGallery();
  }

  updateGallery(){
    this.fillGallery( this.pageNum , this.searchString, this.APIKEY);
  }
  fillGallery( _page, _searchinput, _apikey){
    this.queryUrl = "https://api.unsplash.com/search/photos?page=" + _page + "&query=" + _searchinput + "&client_id=" + _apikey;
    this.dataService.getRemoteData(this.queryUrl).subscribe(data => {
      this.imageList = data;
  });
  }

  nextPage(){
    this.pageNum += 1;
    this.fillGallery( this.pageNum, this.searchString, this.APIKEY);
  }
  previousPage(){
    this.pageNum -= 1;
    this.fillGallery( this.pageNum, this.searchString, this.APIKEY);
  }
  
  
  

}
