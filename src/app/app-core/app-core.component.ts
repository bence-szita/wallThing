import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Directive, HostListener, AfterViewInit  } from '@angular/core';
import { NgModule } from '@angular/core';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppCoreComponent implements OnInit{

  @ViewChild('canvas', {static: true})
  canvas: ElementRef;

  @ViewChild('background') background : ElementRef;
 /*  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>; */
  public ctx: CanvasRenderingContext2D;
  public framed_img = new Image();
  public background_img = new Image();
  canvasWidth : number;
  canvasHeight : number;
  isImageMovable: boolean= false;
  currentX : number;
  currentY : number;
  imageWidth: number= 200;
  imageHeight: number= 300;
  imagePosX: number;
  imagePosY: number;
  cursorPosOnImageX: number;
  cursorPosOnImageY: number;
  imageZoom: number;
  mySize: number;
  backgroundWidth: number;
  backgroundHeight: number;
  

  ngOnInit() {
    this.background_img.src = "assets/images/pictureonwall-small.jpg";
    this.framed_img.src = "https://images.unsplash.com/photo-1557218825-334e575bcc38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzOTE3OH0";
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    const canvasID = document.getElementById('stage');
    console.log(this.background);/* var canvasRect = this.ctx.canvas.getBoundingClientRect() */
    console.log(this.canvas);
/*     this.ctx.canvas.width= this.background_img.width;
    this.ctx.canvas.height= this.background_img.height; */

    this.imageZoom = 0.5;


    this.background_img.onload = () => {
      console.log("ezt", this.background.nativeElement.clientWidth);
      console.log("ezt", this.background.nativeElement.scrollWidth);
      this.backgroundWidth = this.background.nativeElement.width;
      this.backgroundHeight = this.background.nativeElement.height;
      

    }


    this.framed_img.onload = () => {
      // context.drawImage(framed_img, currentX-(framed_img.width/2), currentY-(framed_img.height/2), framed_img.width*imgScale.value, framed_img.height*imgScale.value);
      this.imagePosX = this.canvasWidth/2 - this.framed_img.width/2;
      this.imagePosY = this.canvasHeight/2 - this.framed_img.height/2;

/*      this.ctx.canvas.width =  this.framed_img.width;
      
      this.ctx.canvas.height=  this.framed_img.height; */

      this.canvasWidth = this.ctx.canvas.clientWidth;
      this.canvasHeight = this.ctx.canvas.clientHeight;

      this.currentX = this.imagePosX;
      this.currentY = this.imagePosY;
      this.imageWidth = this.framed_img.width;
      this.imageHeight = this.framed_img.height;

      this._imgRender();
    }
    
    canvasID.addEventListener('mousedown', (e) => {
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.pageX - canvasRect.x);
      var mouseY = Math.floor(e.pageY - canvasRect.y);

      /*  if ( mousex > ) */
     this.cursorPosOnImageX = mouseX-this.currentX;
     this.cursorPosOnImageY = mouseY-this.currentY;
    
/*      console.log("mousex", mouseX)
     console.log("currentx", this.currentX)
     console.log("cursor on img", this.cursorPosOnImageX)
     console.log("img width", this.imageWidth)
 */

      console.log(this.currentX);
     if ((this.cursorPosOnImageX <= this.imageWidth ) &&
          (this.cursorPosOnImageX > 0) &&
          (this.cursorPosOnImageY <= this.imageHeight) &&
          (this.cursorPosOnImageY > 0) 
         ) {
              this.isImageMovable = true;
              console.log('touch start')
     }

   }); 

   canvasID.addEventListener('mousemove', (e) => {
   /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
   if (this.isImageMovable){
    var canvasRect = this.ctx.canvas.getBoundingClientRect() /* to refactor: add resize element observer*/
    this.currentX = Math.ceil(e.pageX - canvasRect.x - this.cursorPosOnImageX);
    this.currentY = Math.ceil(e.pageY - canvasRect.y - this.cursorPosOnImageY);

  
      this.ResetCanvas()
      this._drawImage(this.framed_img);
    }
  });

    canvasID.addEventListener('touchstart', (e) => {
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.changedTouches[0].pageX - canvasRect.x);
      var mouseY = Math.floor(e.changedTouches[0].pageY - canvasRect.y);

     /*  if ( mousex > ) */
     this.cursorPosOnImageX = mouseX-this.currentX;
     this.cursorPosOnImageY = mouseY-this.currentY;


     if ((this.cursorPosOnImageX <= this.imageWidth ) &&
     (this.cursorPosOnImageX > 0) &&
     (this.cursorPosOnImageY <= this.imageHeight) &&
     (this.cursorPosOnImageY > 0) ) {
          this.isImageMovable = true;
          console.log('touch start')
    }
   });

    canvasID.addEventListener('touchmove', (e) => {
      /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
      if (this.isImageMovable){
       var canvasRect = this.ctx.canvas.getBoundingClientRect() /* to refactor: add resize element observer*/
       this.currentX = Math.ceil(e.changedTouches[0].pageX - canvasRect.x - this.cursorPosOnImageX);
       this.currentY = Math.ceil(e.changedTouches[0].pageY - canvasRect.y - this.cursorPosOnImageY);
       
         this.ResetCanvas()
         this._drawImage(this.framed_img);
       }
    });

    /* ending click or touch, chaning movable to unmovable */
    canvasID.addEventListener('touchend', (e) => {
      /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
     this.isImageMovable = false;
     console.log('touch end')
    
    });

    canvasID.addEventListener('mouseup', (e) => {
      /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
    this.isImageMovable = false;

    });
   };

   modifyZoom(zoomChanger){
    this.imageZoom += zoomChanger;
    this.ResetCanvas();
    this._imgRender();
   }
  _imgRender(){
  /*   this.mouseEvents();
 */
    this._drawImage(this.framed_img)
  }


  ResetCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  modifyImage(newImage){
    this.ResetCanvas();
    this.framed_img.src = newImage;
/*     this._drawImage(this.framed_img) */

  }
  _drawImage(imageToRender){
    this.ctx.drawImage(imageToRender, this.currentX, this.currentY, this.framed_img.width*this.imageZoom, this.framed_img.height*this.imageZoom);
  }


  constructor() {
   
   }

}
