import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Directive, HostListener, AfterViewInit  } from '@angular/core';
import { coordinates} from '../models/coordinates'
import { dimensions} from '../models/dimensions'


@Component({
  selector: 'app-core',
  templateUrl: './app-core.component.html',
  styleUrls: ['./app-core.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppCoreComponent implements OnInit{

  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  @ViewChild('background') background : ElementRef;

  ctx: CanvasRenderingContext2D;
  framed_img = new Image();
  background_img = new Image();
  newBackground = new Image();

  isImageMovable: boolean= false;
  isImageRendered: boolean = false;
  borderToggle: boolean;
  imageZoom: number = 0.5;
  mySize: number;

  /* canvas dimensions */
  canvasData: dimensions = {width: 0, height: 0};
   /* Dimensions of background image for canvas */
  canvasBackground: dimensions = { width: 0, height: 0}

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
    this.framed_img.src = "";
    this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
  

    this.background_img.onload = () => {
      this.canvasBackground.width = this.background.nativeElement.width;
      this.canvasBackground.height = this.background.nativeElement.height; 
      this.initImagePosition()
      this.getImageSize();
    }
  

    this.framed_img.onload = () => {
     
      this.getImageSize();
      this.canvasData.width = this.ctx.canvas.clientWidth;
      this.canvasData.height = this.ctx.canvas.clientHeight;
      
        if (!this.isImageRendered){
          this.initImagePosition()
          this.isImageRendered = true;
        }
    }
    
    /* Mouse move: get coordinates and check if image is movable. For mouse support */
    this.canvas.nativeElement.addEventListener('mousedown', (e) => {
      e.preventDefault();
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.pageX - canvasRect.x);
      var mouseY = Math.floor(e.pageY - canvasRect.y);

     this.cursorPosOnImage.x = -1*(this.imageCenterPosition.x - mouseX);
     this.cursorPosOnImage.y = this.imageCenterPosition.y - mouseY;
  
      this.checkImageMovable()
      this._drawImage(this.framed_img);

    }); 

    /* Mouse move: if image is movable, move center position with cursor */
     this.canvas.nativeElement.addEventListener('mousemove', (e) => {
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

    /* Touch start: get coordinates and check if image is movable. For touch support*/
     this.canvas.nativeElement.addEventListener('touchstart', (e) => {
      e.preventDefault();
      var canvasRect = this.ctx.canvas.getBoundingClientRect()
      var mouseX = Math.floor(e.changedTouches[0].pageX - canvasRect.x);
      var mouseY = Math.floor(e.changedTouches[0].pageY - canvasRect.y);

      this.cursorPosOnImage.x = -1*(this.imageCenterPosition.x - mouseX);
      this.cursorPosOnImage.y = -1*(this.imageCenterPosition.y - mouseY);
 
      this.checkImageMovable();
    });

    /* Touch move:  if image is movable, move center position with cursor*/
     this.canvas.nativeElement.addEventListener('touchmove', (e) => {
      e.preventDefault();
      /* getting coordinates of canvas box and gathering mouse coordinate relative to the canvas */
      if (this.isImageMovable){
       var canvasRect = this.ctx.canvas.getBoundingClientRect() /* to refactor: add resize element observer*/
       this.imageCenterPosition.x = Math.ceil(e.changedTouches[0].pageX - canvasRect.x - this.cursorPosOnImage.x);
       this.imageCenterPosition.y = Math.ceil(e.changedTouches[0].pageY - canvasRect.y - this.cursorPosOnImage.y);

      this.ResetCanvas()
      this._drawImage(this.framed_img);
      }
    }, { passive: false });

    /* ending click or touch, changing movable to unmovable */
     this.canvas.nativeElement.addEventListener('touchend', (e) => {
      this.isImageMovable = false;
    });

     this.canvas.nativeElement.addEventListener('mouseup', (e) => {
      this.isImageMovable = false;
    });


     this.canvas.nativeElement.addEventListener("wheel", event => {
      const delta = Math.sign(event.deltaY);
      this.modifyZoom(-0.05*delta);;
    });

  };

  getImageSize(){
    [this.actualSize.width, this.actualSize.height] = [this.framed_img.width, this.framed_img.height].map(item => item * this.imageZoom) ;
  }


  /* initiated starting position for image, depending on canvas size */
  initImagePosition(){
    this.imageCenterPosition.x = this.canvasBackground.width/2;
    this.imageCenterPosition.y = this.canvasBackground.height/2;
  }

  getImagePosition(){
    this.imagePosition.x = this.canvasData.width/2 - this.actualSize.width/2;
    this.imagePosition.y = this.canvasData.height/2 - this.actualSize.height/2;
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

    if (this.borderToggle){
      this._drawFrame();
    }
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
    
    if (this.imageCenterPosition !== undefined && this.isImageRendered){
      this._drawImage(this.framed_img);
    }

  }

  drawFrame(e){

    this.frameColor = e.frameColor;
    this.frameWidth = e.frameWidth;
    this.bgColor = e.bgColor;
    this.bgWidth = e.bgWidth;

    if (this.imageCenterPosition !== undefined && this.isImageRendered){
      this._drawImage(this.framed_img);
    }

  }


  checkImageMovable(){
    if ((this.cursorPosOnImage.x <= this.actualSize.width*0.5) &&
    (this.cursorPosOnImage.x >= this.actualSize.width*-0.5) &&
    (this.cursorPosOnImage.y <= this.actualSize.height*0.5) &&
    (this.cursorPosOnImage.y >= this.actualSize.height*-0.5) 
   ) {
        this.isImageMovable = true;
    }
  }


 

}
