import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinanumeroComponent } from './adivinanumero.component';

describe('AdivinanumeroComponent', () => {
  let component: AdivinanumeroComponent;
  let fixture: ComponentFixture<AdivinanumeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdivinanumeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdivinanumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
