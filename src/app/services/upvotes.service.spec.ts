import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UpvotesService } from './upvotes.service';

describe('UpvotesService', () => {
  let baseUrl = 'http://ec2-35-175-212-202.compute-1.amazonaws.com:9095/upvote/'
  let upvotesService: UpvotesService;
  let upvote:any;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    upvotesService = TestBed.inject(UpvotesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    upvote = [
      {
        "id": 1,
        "postId":1 ,
        "userId": 1,
      },
  ];
  });

  it('should be created', () => {
    expect(upvotesService).toBeTruthy();
  });

  let result: any = [];

  it('should get Upvotes on the post', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {    
    http
      .get(baseUrl)
      .subscribe(data => {
        result = data;
        expect(result).toEqual(upvote)
      });

    const req = httpMock.expectOne(baseUrl);
    expect(req).toBeDefined();
    expect(req.request.method).toEqual('GET');
    req.flush(upvote);
    httpMock.verify();
  }));

  it('should add and upvote to the post', () => {
    upvotesService.addUpvote(upvote).subscribe(
      data => expect(upvote).toEqual(upvote, 'should return reply'),fail
    );

    const req = httpTestingController.expectOne(baseUrl + 'add-upvote');
    expect(req.request.body).toEqual(upvote);
  })

  it('should delete selected upvote', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    upvotesService.deleteUpvote(1).subscribe((data:any) => {
      expect(data).toBe(1);
    });

    const req = httpMock.expectOne(baseUrl+'delete/'+ 1);
    expect(req.request.body).toBe(null);
    req.flush(1);
    httpMock.verify();
  }));
});
