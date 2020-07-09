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

  /* ctx.fillRect(25, 25, 150, 150); */

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = "#D74022";
    this.ctx.fillRect(25, 25, 150, 150);  
  }

/*   this.ctx.fillStyle = "#D74022";
  this.ctx.fillRect(25, 25, 150, 150);  */


  constructor() {
   
   }

}
