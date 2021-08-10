import { TestBed, inject } from '@angular/core/testing';
import { RepliesService } from './replies.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { HttpClient } from '@angular/common/http';
describe('RepliesService', () => {
  let baseUrl = 'http://ec2-35-175-212-202.compute-1.amazonaws.com:9095/api/v1/responses/';
  let repliesService: RepliesService;
  let response: any;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    repliesService = TestBed.inject(RepliesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    response = [
      {
          "id": 1,
          "content": "drerit dolor magna. Duis ultricies lacus sed turpis tincidunt.",
          "postId": 1
      },
  ];
  });
  
  it('should be created', () => {
    expect(repliesService).toBeTruthy();
  });

  let result: any = [];

  it('expects a GET request', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    http
      .get(baseUrl)
      .subscribe(data => {
        result = data;
        expect(result).toEqual(response)
      });
  
    const req = httpMock.expectOne(baseUrl);
    expect(req).toBeDefined();
    expect(req.request.method).toEqual('GET');
    req.flush([
      {
          "id": 1,
          "content": "drerit dolor magna. Duis ultricies lacus sed turpis tincidunt.",
          "postId": 1
      },
  ]);
    httpMock.verify();
  }));

  it ("should make a reply and return it", () => {
    const reply = {
      "postId": 1,
      "content": "test service...?"
    };
    repliesService.postReply(reply).subscribe(
      data => expect(reply).toEqual(reply, 'should return reply'),fail
    );

    const req = httpTestingController.expectOne(baseUrl+'submit-response');
    expect(req.request.body).toEqual(reply);
  })


    it ("should delete the selected reply", inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
      repliesService.deleteReply(1).subscribe((data:any) => {
        expect(data).toBe(1);
      });

      const req = httpMock.expectOne(baseUrl+'delete/'+ 1);
      expect(req.request.method).toBe('DELETE');
      req.flush(1);
      httpMock.verify();
    }));

  it ("should update the selected reply"), inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    const reply = {
      "postId": 1,
      "content": "test service...?"
    };
    repliesService.updateReply(reply).subscribe((data: any) => {
      expect(data.content).toBe("test service...?");
    });

    const req = httpMock.expectOne(baseUrl+"update");
    expect(req.request.method).toBe('PUT');
    req.flush({content: "testing wheeeeee"});
    httpMock.verify();
  });

});
