import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation  } from '@angular/core';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppCoreComponent implements OnInit{

  @ViewChild('canvas', {static: true})
  canvas: ElementRef;
 /*  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>; */
  public ctx: CanvasRenderingContext2D;

  public framed_img = new Image();

  ngOnInit() {
    this.framed_img.src = "/assets/images/goldberg-small.jpg";
    this.ctx = this.canvas.nativeElement.getContext('2d');
  

    this.ctx.fillStyle = "#D74022";
    this.ctx.fillRect(0, 0, 50, 50);  


    this.framed_img.onload = () => {
      // context.drawImage(framed_img, 0, 0);// this is line 14
      // context.drawImage(framed_img, currentX-(framed_img.width/2), currentY-(framed_img.height/2), framed_img.width*imgScale.value, framed_img.height*imgScale.value);
      console.log(this.framed_img.src);
      this.ctx.drawImage(this.framed_img, 0, 0,  100, 100);
   };

  }

  _Go(){
    this.ctx.drawImage(this.framed_img, 0, 100,  100, 100);
  }





  constructor() {
   
   }

}
