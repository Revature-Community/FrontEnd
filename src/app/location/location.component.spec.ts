import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationService } from '../location.service';
import { LocationComponent } from './location.component';


describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ LocationComponent ],
      providers: [ LocationService ]
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 it('should create', () => {
    expect(component).toBeTruthy();
  });
 
 it('should have 48 states', () => { 
   expect(component.states.length).toEqual(48); 
 })

 it('should render an html form', () => { 
   const form = fixture.debugElement.nativeElement.querySelector('.revature'); 
   expect(form).toBeTruthy(); 
 })

 it('')

});
