import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BorderInfo } from '../border-info'

@Component({
  selector: 'app-border-picker',
  templateUrl: './border-picker.component.html',
  styleUrls: ['./border-picker.component.css']
})
export class BorderPickerComponent implements OnInit {
/* 
  @Output() frameColor = new EventEmitter<BorderInfo>();
  @Output() frameWidth = new EventEmitter<BorderInfo>();
  @Output() bgColor = new EventEmitter<BorderInfo>();
  @Output() bgWidth = new EventEmitter<BorderInfo>();
 */
  frameColor: string;
  frameWidth: number;
  bgColor: string;
  bgWidth: number;
  borderToggle: boolean;

  @Output() frameInfo = new EventEmitter<{frameColor: string, frameWidth: number, bgColor: string, bgWidth: number}>();
  @Output() borderOn = new EventEmitter<any>();


  frameUpdate(){
    this.frameInfo.emit({frameColor: this.frameColor, frameWidth: this.frameWidth, bgColor: this.bgColor, bgWidth: this.bgWidth});
  
  }

  borderToggleUpdate(){
    this.borderOn.emit(this.borderToggle);


  }

  constructor() {
    this.frameColor = "#000000";
    this.frameWidth = 5;
    this.bgColor = "#ffffff";
    this.bgWidth = 10;
    this.borderToggle = false;
    this.frameUpdate();
    this.borderToggleUpdate();

   }

  ngOnInit(): void {
    this.frameUpdate();
    this.borderToggleUpdate();
  }

}
