import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResponsePipePipe } from '../response-pipe.pipe';

import { ResponseComponent } from './response.component';

const fakeResponses: any = [
  {id: 1, content: "this is a reply", post_id: 1},
  {id: 2, content: "this is a second reply", post_id: 1},
  {id: 3, content: "this is a third reply", post_id: 1}
];

describe('ReponseComponent', () => {
  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;
  let responseDe: DebugElement;
  let submitEl: DebugElement;
  let expectedResp;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ResponseComponent,
        ResponsePipePipe,
      ], 
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    responseDe = fixture.debugElement.query(By.css('#response-input'));
    submitEl = fixture.debugElement.query(By.css('#submit-resp'));
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should enter create response when submitted', () => {
    expectedResp = {id: 1, response: 'Some Response'};
    const expectedResponse = expectedResp.response;
    responseDe.nativeElement.value = expectedResp.response;
    submitEl.triggerEventHandler('click', null);
    expect(responseDe.nativeElement.value).toContain(expectedResponse);
  })

  describe('Render', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have a response', () => {
      const responseElements = fixture.debugElement.queryAll(By.css('.response'));
      for (let i = 0; i < fakeResponses.length; i++) {
        responseElements[i] = fakeResponses[i];
      }
      expect(responseElements.length).toBe(fakeResponses.length);
    });
  });
});
