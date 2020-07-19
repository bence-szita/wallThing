import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  reader = new FileReader();
  @Output() newBackground = new EventEmitter<any>();


  onImageSelected(event){
/*     console.log(event.target.files[0]); */
    this.reader.readAsDataURL(event.target.files[0]);
    console.log(this.reader)

    this.reader.onload = (event) => { // called once readAsDataURL is completed
      /* console.log('abc', event.target.result) */
      /* console.log("onload", event.target.result); */
      this.newBackground.emit(event.target.result);

    };

  }



  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
