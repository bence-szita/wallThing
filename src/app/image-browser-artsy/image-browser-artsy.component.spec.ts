import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBrowserARTSYComponent } from './image-browser-artsy.component';

describe('ImageBrowserARTSYComponent', () => {
  let component: ImageBrowserARTSYComponent;
  let fixture: ComponentFixture<ImageBrowserARTSYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageBrowserARTSYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBrowserARTSYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
