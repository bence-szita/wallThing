import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { DataService} from '../services/data.service';
import { AppCoreComponent } from '../app-core/app-core.component';
import { map } from "rxjs/operators";

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

  queryUrl_ARTSY_next : string;
  queryUrl_ARTSY_previous : string;


  changeImage(e){
    /* this.appCore._drawImage(e.target.src); */

    console.log(e.target);
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
    this.searchString = 'Andy Warhol';
    this.pageNum = 1;

  }


  ngOnInit() {

     this.dataService.getToken().subscribe(data => {
      this.TOKEN_ARTSY = data;
      this.update_ARTSYGallery();
    })  

 
  }
 
  

  update_ARTSYGallery(){
    return this.fill_ARTSYGallery( this.pageNum , this.searchString, this.TOKEN_ARTSY, null);
  }

    /* conditional argument for next and previous querys */
  fill_ARTSYGallery( _page, _searchinput, _apikey, apiQueryNext ){
    this.selectedIndex = null;

    if (apiQueryNext!= null){
      console.log()
      this.queryUrl_ARTSY = apiQueryNext;
      this.queryUrl_ARTSY_previous = this.imageList_ARTSY._links.self.href;
    }
    else{
      this.queryUrl_ARTSY = "https://api.artsy.net/api/search?q=" + this.searchString;

      this.queryUrl_ARTSY = "https://api.artsy.net/api/artworks?total_count=1";

    }

  
    this.dataService.getRemoteDataWithHeader(this.queryUrl_ARTSY, this.TOKEN_ARTSY.token).subscribe(data => {
      this.imageList_ARTSY = data;
      this.queryUrl_ARTSY_next = this.imageList_ARTSY._links.next.href;
     /*  this.queryUrl_ARTSY_previous = this.imageList_ARTSY._links.self.href; */
     console.log(this.imageList_ARTSY._embedded.artworks[6].category);
     return this.imageList_ARTSY ;
  });


  }

  get_ARTSYToken(){
    this.dataService.getToken().subscribe(data => {
      this.TOKEN_ARTSY = data;

  });

    return this.TOKEN_ARTSY;
  }


  nextPage(){
    this.pageNum += 1;
    this.fill_ARTSYGallery( this.pageNum, this.searchString, this.APIKEY_UNSPLASH, this.queryUrl_ARTSY_next);
  }
  previousPage(){
    this.pageNum -= 1;
    this.fill_ARTSYGallery( this.pageNum, this.searchString, this.APIKEY_UNSPLASH, this.queryUrl_ARTSY_next);
  }
  
  public highlightImage(_index: number) {
    this.selectedIndex = _index;
    console.log(_index);
    console.log(this.selectedIndex);
  }
  

}
