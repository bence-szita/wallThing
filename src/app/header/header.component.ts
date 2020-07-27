import { Component, OnInit } from '@angular/core';
import { ImageBrowserARTSYComponent } from '../image-browser-artsy/image-browser-artsy.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imageSourceList: string[] = ['Unsplash', 'Artsy'];
  imageSource: string = 'Unsplash';
  constructor() { }

  ngOnInit(): void {
  }

}
