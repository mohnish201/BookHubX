import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDetailPageComponent } from './books-detail-page.component';

describe('BooksDetailPageComponent', () => {
  let component: BooksDetailPageComponent;
  let fixture: ComponentFixture<BooksDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
