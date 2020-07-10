import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Directive, HostListener  } from '@angular/core';
import { NgModule } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  

  ngOnInit() {
    this.framed_img.src = "assets/images/goldberg-small.jpg";
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    const canvasID = document.getElementById('stage');
    /* var canvasRect = this.ctx.canvas.getBoundingClientRect() */

    this.canvasWidth = this.ctx.canvas.clientWidth;
    this.canvasHeight = this.ctx.canvas.clientHeight;

    this.imagePosX = this.canvasWidth/2 - this.imageWidth/2;
    this.imagePosY = this.canvasHeight/2 - this.imageHeight/2;

    this.currentX = this.imagePosX;
    this.currentY = this.imagePosY;


  


    this.framed_img.onload = () => {
      // context.drawImage(framed_img, currentX-(framed_img.width/2), currentY-(framed_img.height/2), framed_img.width*imgScale.value, framed_img.height*imgScale.value);
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

    console.log("pagex", e.pageX)
    console.log("canvasreactx", canvasRect.x)
    console.log("imgwidth", this.imageWidth)
    console.log("cursononimagex", this.cursorPosOnImageX)



    console.log(this.currentX);
  
      this.ResetCanvas()
      this._drawImage();
    }
    });

    canvasID.addEventListener('touchstart', (e) => {
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.changedTouches[0].pageX - canvasRect.x);
      var mouseY = Math.floor(e.changedTouches[0].pageY - canvasRect.y);
      console.log("x: ", mouseX, "y: ", mouseY);
      console.log("offsetWidth: ", canvasRect.x, "height: ",canvasRect.y);

     /*  if ( mousex > ) */
     this.cursorPosOnImageX = mouseX-this.currentX;
     this.cursorPosOnImageY = mouseY-this.currentY;

     console.log("cursor on img", this.cursorPosOnImageX)
     console.log("img width", this.imageWidth)

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
         this._drawImage();
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

  

  _imgRender(){
  /*   this.mouseEvents();
 */
    this._drawImage()
  }


  ResetCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  /* mouseEvents(){

    this.ctx.onmousedown = function(e) {

      var mouseX = e.pageX - this.parentNode.parentNode.offsetLeft;
      var mouseY = e.pageY - this.parentNode.parentNode.offsetTop;

      if (mouseX >= (currentX - framed_img.width/2) &&
          mouseX <= (currentX + framed_img.width/2) &&
          mouseY >= (currentY - framed_img.height/2) &&
          mouseY <= (currentY + framed_img.height/2)) {
        isDraggable = true;
      }
  };

  canvas.onmousemove = function(e) {
    if (isDraggable) {
      currentX = e.pageX - this.parentNode.parentNode.offsetLeft;
      currentY = e.pageY - this.parentNode.parentNode.offsetTop;
      _ResetCanvas();
      _DrawImage();
    }

  };

  canvas.onmouseup = function(e) {
    isDraggable = false;
  };
  canvas.onmouseout = function(e) {
    isDraggable = false;
  };

  } */

  _drawImage(){

    this.ctx.drawImage(this.framed_img, this.currentX, this.currentY, 200, 300);
  }



  constructor() {
   
   }

}
