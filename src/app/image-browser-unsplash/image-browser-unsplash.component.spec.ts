import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBrowserUnsplashComponent } from './image-browser-unsplash.component';

describe('ImageBrowserComponent', () => {
  let component: ImageBrowserUnsplashComponent;
  let fixture: ComponentFixture<ImageBrowserUnsplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageBrowserUnsplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBrowserUnsplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
