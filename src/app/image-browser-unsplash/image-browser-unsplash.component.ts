import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataService} from '../services/data.service';

@Component({
  selector: 'image-browser-unsplash',
  templateUrl: './image-browser-unsplash.component.html',
  styleUrls: ['./image-browser-unsplash.component.css']
})
export class ImageBrowserUnsplashComponent implements OnInit {
  @Output() newImage = new EventEmitter<object>();
  @Output() zoomChange = new EventEmitter<number>();
  Unsplash : {queryUrl: string, queryUrlNext: string, queryUrlPrevious: string, token: any, pageNum: number, searchString: string, imageList: any };
  selectedIndex : number;

  
  constructor( private dataService: DataService) {
    this.Unsplash = { queryUrl: "",
                      queryUrlNext: "",
                      queryUrlPrevious: "",
                      token: "mo0EDOofA6crGOy5UROfCFEJjrJvLUcwAQMJg-mqsBQ",
                      pageNum: 1,
                      searchString: 'abstract',
                      imageList: {}
                    };
  }


  ngOnInit() {
    this.update_UNSPLASHGallery(); 
  }


  update_UNSPLASHGallery(){
    this.fill_UNSPLASHGallery( this.Unsplash.token);
  }
  fill_UNSPLASHGallery( _apikey){
    this.selectedIndex = null;
    this.Unsplash.queryUrl = "https://api.unsplash.com/search/photos?page=" + this.Unsplash.pageNum + "&query=" + this.Unsplash.searchString + "&client_id=" + _apikey;

    this.dataService.getRemoteData(this.Unsplash.queryUrl).subscribe(data => {
      this.Unsplash.imageList= data;
  });
  }


  nextPage(){
    this.Unsplash.pageNum += 1;
    this.fill_UNSPLASHGallery(this.Unsplash.token);
  }
  previousPage(){
    this.Unsplash.pageNum -= 1;
    this.fill_UNSPLASHGallery(this.Unsplash.token);
  }
  
  public highlightImage(_index: number) {
    this.selectedIndex = _index;
  }
  
  changeImage(e){
    this.newImage.emit(e.target.src)
  }

  increaseZoom(e){

    this.zoomChange.emit(+0.05)
    
  }

  decreaseZoom(e){
    this.zoomChange.emit(-0.05);
  }

}
