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

  ARTSY : {queryUrl: string, queryUrlNext: string, queryUrlPrevious: string, token: any, pageNum: number, searchString: string, imageList: any };
  selectedIndex : number;
  

  constructor( private dataService: DataService) {

    /* Define values for ARTSY queries */
    this.ARTSY = {  queryUrl: "",
                    queryUrlNext: "",
                    queryUrlPrevious: "",
                    token: null,
                    pageNum: 1,
                    searchString: 'Picasso',
                    imageList: {}
              }
  }


  async ngOnInit() {

    this.dataService.getToken().subscribe(data => {
      this.ARTSY.token = data;
      this.update_ARTSYGallery();
    })  

 
  }

    /* conditional argument for next and previous querys */
    fill_ARTSYGallery( apiQueryNext ){
      this.selectedIndex = null;
  
      if (apiQueryNext!= null){
        this.ARTSY.queryUrl = apiQueryNext;
        this.ARTSY.queryUrlPrevious =  this.ARTSY.imageList._links.self.href;
      }
      else{
        this.ARTSY.queryUrl = "https://api.artsy.net/api/search?q=" + this.ARTSY.searchString;
      }
  
      this.dataService.getRemoteDataWithHeader(this.ARTSY.queryUrl, this.ARTSY.token.token).subscribe(data => {
        this.ARTSY.imageList = data;
        this.ARTSY.queryUrlNext = this.ARTSY.imageList._links.next.href;
  
    });
  
  
    }
  
  
    nextPage(){
      this.ARTSY.pageNum += 1;
      this.fill_ARTSYGallery( this.ARTSY.queryUrlNext);
    }
    previousPage(){
      this.ARTSY.pageNum -= 1;
      this.fill_ARTSYGallery(this.ARTSY.queryUrlPrevious);
    }
    
    public highlightImage(_index: number) {
      this.selectedIndex = _index;
    }
 
  changeImage(e){
    
    /* replaces square with medium for higher quality image */
     this.newImage.emit(e.target.src)
   }
 
   increaseZoom(e){
     this.zoomChange.emit(+0.05)
     
   }
 
   decreaseZoom(e){
     this.zoomChange.emit(-0.05);
   }
 

  update_ARTSYGallery(){
    this.fill_ARTSYGallery( null);
  }

  
  

}
