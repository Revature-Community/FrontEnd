import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/models/posts';
import { PostsService } from 'src/app/posts.service';
import { HttpClient } from '@angular/common/http';
import { UpvotesService } from 'src/app/services/upvotes.service';
import { DownvoteService } from 'src/app/services/downvote.service';
import { Upvote } from 'src/app/models/upvote';
import { Downvote } from 'src/app/models/downvote';
import { PinpostService } from 'src/app/services/pinpost.service';
import { DeletepostService } from 'src/app/services/deletepost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-readpost',
  templateUrl: './readpost.component.html',
  styleUrls: ['./readpost.component.css']
})
export class ReadpostComponent implements OnInit {
  locationForPosts: number = 0;
  view: string = "all"
  role: string = localStorage.getItem('role');

  constructor(private http: HttpClient, 
    private _posts: PostsService,
    private upvoteService: UpvotesService,
    private downvoteService: DownvoteService,
    private pinpost: PinpostService,
    private deletePostService: DeletepostService,
    private router:Router) {
      
  }


  postList: Array<Posts> = []
  locationdata: any = [];

  foodPosts: Array<Posts> = []
  housingPosts: Array<Posts> = []
  eventPosts: Array<Posts> = []
  entertainmentPosts: Array<Posts> = []
  locationPosts: Array<Posts> = []
  find: false;
  showCreatePost = 'false';

  ngOnInit(): void {
    this._posts.getPosts().subscribe(async data => {
      console.log('data', data);
      this.postList = data;

      // this.getVotes();
      // console.log(this.postList[0].pinStatus.pinStatus);
      for(let post of this.postList)
      {
        this.upvoteService.getCount(post.id).subscribe(data => {
          post.voteCount = data;
        })
        
      }
      
    })
    // this.getData();


  }

  updatePosts(e) {
    this._posts.getPosts().subscribe(data => {
      this.postList = data;
    });
    this.getData();
  }

  // Start of post filtering methods -----------------------------------
  listFoodPosts(categoryType: string) {
    if (this.foodPosts.length >= 0) {
      console.log("foodPosts: "+this.foodPosts);
      console.log("Category Type: "+categoryType);
      for (let i = 0; i < this.postList.length; i++) {
        if (this.postList[i].categoryType === "Food") {
          if (this.foodPosts.includes(this.postList[i])) {
            continue;
          }
          this.foodPosts.push(this.postList[i])
          console.log("postLists of i"+this.postList[i]);

        }
      }
      this.view = categoryType;
    }
  }
  listEventPosts(categoryType: string) {
    if (this.eventPosts.length >= 0) {
      for (let i = 0; i < this.postList.length; i++) {
        if (this.postList[i].categoryType === "Event") {
          if (this.eventPosts.includes(this.postList[i])) {
            break;
          }
          this.eventPosts.push(this.postList[i])
        }
      }
      this.view = categoryType;
    }
  }
  listHousingPosts(categoryType: string) {
    if (this.housingPosts.length >= 0) {
      for (let i = 0; i < this.postList.length; i++) {
        if (this.postList[i].categoryType === "Housing") {
          if (this.housingPosts.includes(this.postList[i])) {
            break;
          }
          this.housingPosts.push(this.postList[i])
        }
      }
      this.view = categoryType;
    }
  }
  listEntertainmentPosts(categoryType: string) {
    if (this.entertainmentPosts.length == 0) {
      for (let i = 0; i < this.postList.length; i++) {
        if (this.postList[i].categoryType === "Entertainment") {

          if (this.entertainmentPosts.includes(this.postList[i])) {
            break;
          }
          this.entertainmentPosts.push(this.postList[i])
        }
      }
    }
    this.view = categoryType;
  }
  // end of post filtering methods -----------------------------------

  getData() {
    const url = 'http://localhost:8085/locations/';
    this.http.get(url).subscribe(res => {
      this.locationdata = res;
    });
  }

  filterByLocation(locId: number) {

    this.locationForPosts = locId;

    if (this.locationForPosts != 0) {
      console.log("Inside if filterByLocation: " + this.locationForPosts);
      const url = 'http://localhost:8085/post/byLocation/' + this.locationForPosts;
      this.http.get<Posts[]>(url).subscribe(res => {
        this.postList = res;
      });
    }
    else {
      // console.log("Inside else filterByLocation: " + this.locationForPosts);
      this._posts.getPosts().subscribe(data => {
        this.postList = data;
      })
    }

  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  handleShowPost() {
    this.showCreatePost = this.showCreatePost === 'false' ? 'true' : 'false';
  }

  addUpvote(post: Posts):void {
    console.log("Hello :)");
    //I think this should get the userId...
    let userId = parseInt(localStorage.getItem("userId"));
    // console.log(userId); //This is correct
    //This should give me the entire post object...
    // console.log("post.id passed as a param = " + post.id) //And it does
    //Instantitate a new upvote Object...
    let newUpvote = new Upvote(0, post.id, parseInt(localStorage.getItem("userId")));
    // newUpvote.id = 0;
    // newUpvote.postId = post.id;
    // newUpvote.userId = parseInt(localStorage.getItem("userId"));
    console.log(newUpvote);
    this.upvoteService.addUpvote(newUpvote).subscribe((data) => { },
      () => { }
    )
  }

  addDownvote(post: Posts):void {
    console.log("Goodbye :(")
       //I think this should get the userId...
       let userId = parseInt(localStorage.getItem("userId"));
       // console.log(userId); //This is correct
       //This should give me the entire post object...
       // console.log("post.id passed as a param = " + post.id) //And it does
       //Instantitate a new upvote Object...
       let newDownvote = new Downvote(0, post.id, parseInt(localStorage.getItem("userId")));
       // newUpvote.id = 0;
       // newUpvote.postId = post.id;
       // newUpvote.userId = parseInt(localStorage.getItem("userId"));
       console.log(newDownvote);
       this.downvoteService.addDownvote(newDownvote).subscribe((data) => { },
         () => { }
       )
  }

  pinPostLocation(post: Posts):void{
    this.pinpost.pinPostbyLocation(post).subscribe((data)=>{
      alert("Post Pinned by Location");
      // this method is using the service to pin a post by location
      // when a post gets pinned , we show the alert
    },
    () => {} )
  }
   pinPostCategory(post: Posts):void{
    this.pinpost.pinPostbyCategory(post).subscribe((data)=>{
      alert("Post Pinned by Category");
      // this method is using the service to pin a post by category
      // when a post gets pinned , we show the alert
     
    },
    () => {} )
  }

  deletePost(post: Posts):void{
    this.deletePostService.deletePost(post).subscribe((data)=>{
      alert("Post Deleted!");
     
      // this method is using the service to delete a post
      // when a post gets deleted , we show the alert
    },
    ()=>{})
  }
}