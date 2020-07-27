import { Component, OnInit,EventEmitter, Output  } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() imageSourceForUI: EventEmitter<any> = new EventEmitter<any>();

  imageSourcePicked: string = 'Artsy';
  imageSourceList: string[] = ['Unsplash', 'Artsy'];
 

  constructor() {
/*     this.imageSourceForUI.emit('imageSourcePicked'); */
  this.imageSourceForUI.emit('Artsy');
   }

  ngOnInit(): void {
 
  }

  handleChange(e){
    this.imageSourceForUI.emit(e.value);
  }

}
