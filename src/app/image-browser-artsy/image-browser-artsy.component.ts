import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { DataService} from '../services/data.service';
import { AppCoreComponent } from '../app-core/app-core.component';

@Component({
  selector: 'app-image-browser-artsy',
  templateUrl: './image-browser-artsy.component.html',
  styleUrls: ['./image-browser-artsy.component.css']
})
export class ImageBrowserARTSYComponent implements OnInit {
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
  imageList_ARTSY: any;

  TOKEN_ARTSY : any;
  queryUrl_ARTSY : string;


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
    this.searchString = 'abstract';
    this.APIKEY_UNSPLASH = "mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";  
    this.url_UNSPLASH = "https://api.unsplash.com/search/photos?page=1&query=gorilla&client_id=mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ";
    this.pageNum = 1;
    this.queryUrl_UNSPLASH = "https://api.unsplash.com/search/photos?page=" + this.pageNum + "&query=" + this.searchString + "&client_id=" + this.APIKEY_UNSPLASH;
    /* this.APIKEY_ARTSY =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI1ZjE5NWQyOWVkNzM5ZTAwMGQ0M2VhZmQiLCJleHAiOjE1OTYxMDI2MDEsImlhdCI6MTU5NTQ5NzgwMSwiYXVkIjoiNWYxOTVkMjllZDczOWUwMDBkNDNlYWZkIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjVmMTk1ZDQ5Njc3YTI0MDAwZThjNzk1NyJ9.8w08Z5-mgkApzItGW5xg1pkTepTnTV4RWS9Uo_XhLU4"
     */

  }


  ngOnInit() {
    console.log("itt a")

     this.dataService.getToken().subscribe(data => {
      console.log("itt jo", data)
      this.TOKEN_ARTSY = data;
      this.update_ARTSYGallery();
      

    })  

 
  }

  update_UNSPLASHGallery(){
    return this.fill_UNSPLASHGallery( this.pageNum , this.searchString, this.APIKEY_UNSPLASH);
  }
  fill_UNSPLASHGallery( _page, _searchinput, _apikey){
    this.selectedIndex = null;
    this.queryUrl_UNSPLASH = "https://api.unsplash.com/search/photos?page=" + _page + "&query=" + _searchinput + "&client_id=" + _apikey;
    this.dataService.getRemoteData(this.queryUrl_UNSPLASH).subscribe(data => {
      this.imageList = data;
  });
    

    
  }

  update_ARTSYGallery(){
    this.fill_ARTSYGallery( this.pageNum , this.searchString, this.TOKEN_ARTSY);
  }

  fill_ARTSYGallery( _page, _searchinput, _apikey){
    this.selectedIndex = null;
    this.queryUrl_ARTSY = "https://api.artsy.net/api/artworks?cursor=4d8b93b04eb68a1b2c001b9d%3A4d8b93b04eb68a1b2c001b9d"
    console.log("ohhh", this.imageList);
    this.dataService.getRemoteDataWithHeader(this.queryUrl_ARTSY, this.TOKEN_ARTSY.token).subscribe(data => {
      this.imageList_ARTSY = data;
      console.log("ehhh", this.imageList_ARTSY);
     
      
  });

  console.log('link', this.imageList_ARTSY._embedded.artworks[0]._links.thumbnail.href);
  }

  get_ARTSYToken(){
    this.dataService.getToken().subscribe(data => {
      this.TOKEN_ARTSY = data;

  });

    return this.TOKEN_ARTSY;
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
    console.log(_index);
    console.log(this.selectedIndex);
  }
  

}
