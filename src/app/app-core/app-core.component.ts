import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Directive, HostListener, AfterViewInit  } from '@angular/core';
import { NgModule } from '@angular/core';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { throwError } from 'rxjs';

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
  actualFramedImgSize: Array<number>;
  imageCenterPosition: Array<number>;
  isImageRendered: boolean = false;
  newBackground = new Image();
  frameColor: string;
  frameWidth: number;
  bgColor: string;
  bgWidth: number;
  borderToggle: boolean;

  ngOnInit() {
    this.background_img.src = "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80";
    this.framed_img.src = "https://images.unsplash.com/photo-1557218825-334e575bcc38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzOTE3OH0";
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    const canvasID = document.getElementById('stage');
    this.imageZoom = 0.5;

    this.background_img.onload = () => {
      this.backgroundWidth = this.background.nativeElement.width;
      this.backgroundHeight = this.background.nativeElement.height;
      this.getCanvasSize();

    }
  

    this.framed_img.onload = () => {
      // context.drawImage(framed_img, currentX-(framed_img.width/2), currentY-(framed_img.height/2), framed_img.width*imgScale.value, framed_img.height*imgScale.value);

    this.canvasWidth = this.ctx.canvas.clientWidth;
    this.canvasHeight = this.ctx.canvas.clientHeight;
      this.getImageSize();
     /*  this.getImagePosition(); */
    if (!this.isImageRendered){
      this.imageCenterPosition = [this.canvasWidth/2,this.canvasHeight/2];
      this.isImageRendered = true;
    }
    
     /*  this._imgRender(); */
    }
 
    
    canvasID.addEventListener('mousedown', (e) => {
      e.preventDefault();
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.pageX - canvasRect.x);
      var mouseY = Math.floor(e.pageY - canvasRect.y);

      /*  if ( mousex > ) */
     this.cursorPosOnImageX = -1*(this.imageCenterPosition[0] - mouseX);
     this.cursorPosOnImageY = this.imageCenterPosition[1] - mouseY;
  
     if ((this.cursorPosOnImageX <= this.actualFramedImgSize[0]*0.5) &&
          (this.cursorPosOnImageX >= this.actualFramedImgSize[0]*-0.5) &&
          (this.cursorPosOnImageY <= this.actualFramedImgSize[1]*0.5) &&
          (this.cursorPosOnImageY >= this.actualFramedImgSize[1]*-0.5) 
         ) {
              this.isImageMovable = true;
     }
     this._drawImage(this.framed_img);

   }); 

   canvasID.addEventListener('mousemove', (e) => {
    e.preventDefault();
   /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
   if (this.isImageMovable){
    var canvasRect = this.ctx.canvas.getBoundingClientRect() /* to refactor: add resize element observer*/

    this.imageCenterPosition[0] = Math.ceil(e.pageX - canvasRect.x - this.cursorPosOnImageX);
    this.imageCenterPosition[1] = Math.ceil(e.pageY - canvasRect.y + this.cursorPosOnImageY);


      this.ResetCanvas()
      this._drawImage(this.framed_img);
    }
  });

    canvasID.addEventListener('touchstart', (e) => {
      e.preventDefault();
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.changedTouches[0].pageX - canvasRect.x);
      var mouseY = Math.floor(e.changedTouches[0].pageY - canvasRect.y);

    this.cursorPosOnImageX = -1*(this.imageCenterPosition[0] - mouseX);
    this.cursorPosOnImageY = -1*(this.imageCenterPosition[1] - mouseY);
 
    if ((this.cursorPosOnImageX <= this.actualFramedImgSize[0]*0.5) &&
         (this.cursorPosOnImageX >= this.actualFramedImgSize[0]*-0.5) &&
         (this.cursorPosOnImageY <= this.actualFramedImgSize[1]*0.5) &&
         (this.cursorPosOnImageY >= this.actualFramedImgSize[1]*-0.5) 
        ) {
             this.isImageMovable = true;
    }

      console.log("mouse", mouseX,  mouseY);

   });

    canvasID.addEventListener('touchmove', (e) => {
      e.preventDefault();
      /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
      if (this.isImageMovable){
       var canvasRect = this.ctx.canvas.getBoundingClientRect() /* to refactor: add resize element observer*/
       this.imageCenterPosition[0] = Math.ceil(e.changedTouches[0].pageX - canvasRect.x - this.cursorPosOnImageX);
       this.imageCenterPosition[1] = Math.ceil(e.changedTouches[0].pageY - canvasRect.y - this.cursorPosOnImageY);
      console.log("mouse", e.changedTouches[0].pageX - canvasRect.x,  e.changedTouches[0].pageY - canvasRect.y);
      console.log("touch poz", e.changedTouches[0].pageY, canvasRect.y, this.cursorPosOnImageY);
      console.log("center poz",  this.imageCenterPosition[1]);
         this.ResetCanvas()
         this._drawImage(this.framed_img);
       }
    }, { passive: false });

    /* ending click or touch, chaning movable to unmovable */
    canvasID.addEventListener('touchend', (e) => {
      /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
     this.isImageMovable = false;
    
    });

    canvasID.addEventListener('mouseup', (e) => {
      /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
    this.isImageMovable = false;

    });
   };

   getImageSize(){
    this.actualFramedImgSize = [this.framed_img.width, this.framed_img.height].map(item => item * this.imageZoom) ;


  }

  getImagePosition(){
    this.imagePosX = this.canvasWidth/2 - this.actualFramedImgSize[0]/2;
    this.imagePosY = this.canvasHeight/2 - this.actualFramedImgSize[1]/2;
    this.currentX = this.imagePosX;
    this.currentY = this.imagePosY;
  }



   modifyZoom(zoomChanger){
    this.imageZoom += zoomChanger;
    this.ResetCanvas();
    this._imgRender();
    this.getImageSize();
   }
  _imgRender(){
  /*   this.mouseEvents();
 */
    this._drawImage(this.framed_img)
  }

  ResetCanvas() {
    this.ctx.rect(0,0,0,0);
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

  }

  modifyImage(newImage){
    this.ResetCanvas();
    this.framed_img.src = newImage;
     this._drawImage(this.framed_img) 

  }
  _drawImage(imageToRender){
    this.ResetCanvas();
    this.ctx.drawImage(imageToRender, this.imageCenterPosition[0]-(this.framed_img.width*this.imageZoom)/2,
                                      this.imageCenterPosition[1]-(this.framed_img.height*this.imageZoom)/2,
                                      this.framed_img.width*this.imageZoom, this.framed_img.height*this.imageZoom);

    console.log("x: ", this.imageCenterPosition[0]-(this.framed_img.width*this.imageZoom)/2, "y: ", this.imageCenterPosition[1]-(this.framed_img.height*this.imageZoom)/2)

    if (this.borderToggle){
      this._drawFrame();
    }
  }

  getCanvasSize(){
    this.canvasWidth = this.background.nativeElement.width;
   this.canvasHeight = this.background.nativeElement.height;
   this.imageCenterPosition = [this.canvasWidth/2,this.canvasHeight/2];
   
  }

  modifyBackGround(_newBackground){
    this.background_img.src = _newBackground;
  }
  _drawFrame(){ 
    /* draw frame background */
    this.ctx.beginPath();
    if (Math.ceil((this.bgWidth/2))){
      this.ctx.rect(this.imageCenterPosition[0]-(this.framed_img.width*this.imageZoom)/2-Math.ceil((this.bgWidth/2)),
                  this.imageCenterPosition[1]-(this.framed_img.height*this.imageZoom)/2-Math.ceil((this.bgWidth/2)),
                  this.framed_img.width*this.imageZoom+this.bgWidth, this.framed_img.height*this.imageZoom+this.bgWidth);
    };
    this.ctx.lineWidth = this.bgWidth; 
    this.ctx.strokeStyle = this.bgColor;
    this.ctx.stroke();

     /* draw background background */
    this.ctx.beginPath();
    if (Math.ceil((this.frameWidth/2))){
    this.ctx.rect(this.imageCenterPosition[0]-(this.framed_img.width*this.imageZoom)/2-this.bgWidth-Math.ceil((this.frameWidth/2)),
                  this.imageCenterPosition[1]-(this.framed_img.height*this.imageZoom)/2-this.bgWidth-Math.ceil((this.frameWidth/2)),
                  this.framed_img.width*this.imageZoom+this.bgWidth*2+this.frameWidth, this.framed_img.height*this.imageZoom+this.bgWidth*2+this.frameWidth);
    };              
    this.ctx.lineWidth = this.frameWidth; 
    this.ctx.strokeStyle = this.frameColor;
    this.ctx.stroke();

  }

  toggleFrame(e){
    this.borderToggle = e;
    
    if (this.imageCenterPosition !== undefined){
      this._drawImage(this.framed_img);
    }


  }

  drawFrame(e){

    this.frameColor = e.frameColor;
    this.frameWidth = e.frameWidth;
    this.bgColor = e.bgColor;
    this.bgWidth = e.bgWidth;

    if (this.imageCenterPosition !== undefined){
      this._drawImage(this.framed_img);
    }

  }


  constructor() {
   
   }

}
