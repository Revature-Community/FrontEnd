import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { DownvoteService } from './downvote.service';


describe('DownvoteService', () => {
  let service: DownvoteService;
  let baseUrl = 'http://ec2-35-175-212-202.compute-1.amazonaws.com:9095/api/v1/downvotes/';
  let downvote: any
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController
  let result: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DownvoteService);
    downvote = {
      "postId": {
        "title":"title",
        "content":"content",
        "locationId": {
            "id":1,
            "city":"city",
            "state":"state"
        },
      "CategoryType":"category"
    },
      "userId":{
        "id":1,
        "email":"email@email.com",
        "username":"username",
        "password":"password"
      }
    }
  });

  it('should get downvotes on the post', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {    
    http
      .get(baseUrl)
      .subscribe(data => {
        result = data;
        expect(result).toEqual(downvote)
      });

    const req = httpMock.expectOne(baseUrl);
    expect(req).toBeDefined();
    expect(req.request.method).toEqual('GET');
    req.flush(downvote);
    httpMock.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ("should add a downvote"), inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    service.postDownvote(downvote).subscribe(
      data => expect(downvote).toEqual(downvote, 'should return reply'), fail
    );

    const req = httpMock.expectOne(baseUrl+"add-downvote");
    expect(req.request.body).toEqual(downvote)
  });

  it ("should delete the selected downvote", inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    service.deleteDownvote(1).subscribe((data:any) => {
      expect(data).toBe(1);
    });

    const req = httpMock.expectOne(baseUrl+'delete/'+ 1);
    expect(req.request.method).toBe('DELETE');
    req.flush(1);
    httpMock.verify();
  }));

});


