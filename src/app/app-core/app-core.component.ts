import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Directive, HostListener, AfterViewInit  } from '@angular/core';


export interface coordinates {
  x: number;
  y: number;
}

export interface dimensions {
  height: number;
  width: number;
}


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
  ctx: CanvasRenderingContext2D;
  framed_img = new Image();
  background_img = new Image();
  newBackground = new Image();

  isImageMovable: boolean= false;
  isImageRendered: boolean = false;
  borderToggle: boolean;
  imageZoom: number;
  mySize: number;

  /* canvas dimensions */
  canvasData: dimensions = {width: 0, height: 0};
   /* Dimensions of background image for canvas */
  backgroundData: dimensions = { width: 0, height: 0}

  /* coordinates of currently rendered image */
  current: coordinates = {x: 0, y: 0};
  /* coordinates of image to be rendered */
  imagePosition: coordinates  = {x: 0, y: 0};
  /* dimensions of image to be rendered */
  actualSize : dimensions = { width: 0, height: 0}

  /* coordinates of cursor on an image inside the canvas */
  cursorPosOnImage: coordinates = {x: 0, y: 0};

  /* imageCenterPosition: Array<number>; */
  imageCenterPosition: coordinates = {x: 0, y: 0};

  
  /* parameters for frames */
  frameColor: string;
  frameWidth: number;
  bgColor: string;
  bgWidth: number;
 

  constructor() {
   
  }



  ngOnInit() {
    this.background_img.src = "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80";
    this.framed_img.src = "https://images.unsplash.com/photo-1557218825-334e575bcc38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzOTE3OH0";
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    const canvasID = document.getElementById('stage');
    this.imageZoom = 0.5;

    this.background_img.onload = () => {
      this.backgroundData.width = this.background.nativeElement.width;
      this.backgroundData.height = this.background.nativeElement.height;
      this.getCanvasSize();

    }
  

    this.framed_img.onload = () => {

      
    this.canvasData.width = this.ctx.canvas.clientWidth;
    this.canvasData.height = this.ctx.canvas.clientHeight;
      this.getImageSize();
    if (!this.isImageRendered){
     /*  this.imageCenterPosition = [this.canvasData.width/2,this.canvasData.height/2]; */
      this.imageCenterPosition.x = this.canvasData.width/2;
      this.imageCenterPosition.y = this.canvasData.width/2;
      console.log('rendered', this.imageCenterPosition)
     
      this.isImageRendered = true;
    }
    
    }
 
    
    canvasID.addEventListener('mousedown', (e) => {
      e.preventDefault();
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.pageX - canvasRect.x);
      var mouseY = Math.floor(e.pageY - canvasRect.y);

      /*  if ( mousex > ) */
     this.cursorPosOnImage.x = -1*(this.imageCenterPosition.x - mouseX);
     this.cursorPosOnImage.y = this.imageCenterPosition.y - mouseY;
  
     if ((this.cursorPosOnImage.x <= this.actualSize.width*0.5) &&
          (this.cursorPosOnImage.x >= this.actualSize.width*-0.5) &&
          (this.cursorPosOnImage.y <= this.actualSize.height*0.5) &&
          (this.cursorPosOnImage.y >= this.actualSize.height*-0.5) 
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

    this.imageCenterPosition.x = Math.ceil(e.pageX - canvasRect.x - this.cursorPosOnImage.x);
    this.imageCenterPosition.y = Math.ceil(e.pageY - canvasRect.y + this.cursorPosOnImage.y);


      this.ResetCanvas()
      this._drawImage(this.framed_img);
    }
  });

    canvasID.addEventListener('touchstart', (e) => {
      e.preventDefault();
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.changedTouches[0].pageX - canvasRect.x);
      var mouseY = Math.floor(e.changedTouches[0].pageY - canvasRect.y);

    this.cursorPosOnImage.x = -1*(this.imageCenterPosition.x - mouseX);
    this.cursorPosOnImage.y = -1*(this.imageCenterPosition.y - mouseY);
 
    if ((this.cursorPosOnImage.x <= this.actualSize.width*0.5) &&
         (this.cursorPosOnImage.x >= this.actualSize.width*-0.5) &&
         (this.cursorPosOnImage.y <= this.actualSize.height*0.5) &&
         (this.cursorPosOnImage.y >= this.actualSize.height*-0.5) 
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
       this.imageCenterPosition.x = Math.ceil(e.changedTouches[0].pageX - canvasRect.x - this.cursorPosOnImage.x);
       this.imageCenterPosition.y = Math.ceil(e.changedTouches[0].pageY - canvasRect.y - this.cursorPosOnImage.y);
      console.log("mouse", e.changedTouches[0].pageX - canvasRect.x,  e.changedTouches[0].pageY - canvasRect.y);
      console.log("touch poz", e.changedTouches[0].pageY, canvasRect.y, this.cursorPosOnImage.y);
      console.log("center poz",  this.imageCenterPosition.y);
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
    [this.actualSize.width, this.actualSize.height] = [this.framed_img.width, this.framed_img.height].map(item => item * this.imageZoom) ;


  }

  getImagePosition(){
    this.imagePosition.x = this.canvasData.width/2 - this.actualSize.width/2;
    this.imagePosition.x = this.canvasData.height/2 - this.actualSize.height/2;
    this.current.x = this.imagePosition.x;
    this.current.y = this.imagePosition.y;
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
    this.ctx.clearRect(0, 0, this.canvasData.width, this.canvasData.height);

  }

  modifyImage(newImage){
    this.ResetCanvas();
    this.framed_img.src = newImage;
     this._drawImage(this.framed_img) 

  }
  _drawImage(imageToRender){
    this.ResetCanvas();
    this.ctx.drawImage(imageToRender, this.imageCenterPosition.x-(this.framed_img.width*this.imageZoom)/2,
                                      this.imageCenterPosition.y-(this.framed_img.height*this.imageZoom)/2,
                                      this.framed_img.width*this.imageZoom, this.framed_img.height*this.imageZoom);

    console.log("x: ", this.imageCenterPosition.x-(this.framed_img.width*this.imageZoom)/2, "y: ", this.imageCenterPosition.y-(this.framed_img.height*this.imageZoom)/2)

    if (this.borderToggle){
      this._drawFrame();
    }
  }

  getCanvasSize(){
    this.canvasData.width = this.background.nativeElement.width;
   this.canvasData.height = this.background.nativeElement.height;
   this.imageCenterPosition.x = this.canvasData.width/2;
   this.imageCenterPosition.y = this.canvasData.width/2;
   
  }

  modifyBackGround(_newBackground){
    this.background_img.src = _newBackground;
  }
  _drawFrame(){ 
    /* draw frame background */
    this.ctx.beginPath();
    if (Math.ceil((this.bgWidth/2))){
      this.ctx.rect(this.imageCenterPosition.x-(this.framed_img.width*this.imageZoom)/2-Math.ceil((this.bgWidth/2)),
                  this.imageCenterPosition.y-(this.framed_img.height*this.imageZoom)/2-Math.ceil((this.bgWidth/2)),
                  this.framed_img.width*this.imageZoom+this.bgWidth, this.framed_img.height*this.imageZoom+this.bgWidth);
    };
    this.ctx.lineWidth = this.bgWidth; 
    this.ctx.strokeStyle = this.bgColor;
    this.ctx.stroke();

     /* draw background background */
    this.ctx.beginPath();
    if (Math.ceil((this.frameWidth/2))){
    this.ctx.rect(this.imageCenterPosition.x-(this.framed_img.width*this.imageZoom)/2-this.bgWidth-Math.ceil((this.frameWidth/2)),
                  this.imageCenterPosition.y-(this.framed_img.height*this.imageZoom)/2-this.bgWidth-Math.ceil((this.frameWidth/2)),
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


 

}
