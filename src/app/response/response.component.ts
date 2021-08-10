import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RepliesService } from '../services/replies.service';

@Component({
  selector: 'app-reponse',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  
  constructor(private repliesService: RepliesService) { }
  @Input() postId: number | any;
  @ViewChild('textArea', { read: ElementRef }) textArea: ElementRef | any;

  correctUser:boolean = false;
  responses:any = [];
  currentResponse:any;
  displayOptions:Boolean = false;
  editedResponse:any;
  toggl:any;
  editButton:Boolean = false;
  ngOnInit(): void {
    this.repliesService.getReplies(this.postId).subscribe(res => {
      console.log(res);
      for (let val of res) {
        if(localStorage.getItem("userId") == val.userId) {
          this.correctUser = true;
        } else {
          this.correctUser = false;
        }
        let lenless255 = false;
        if (val.content.length > 255) {
          lenless255 = true;
        }
        
        const resp = {username: val.username, id: val.id, response: val.content, show: !lenless255, showEdit: this.correctUser};
        this.responses.push(resp);
      }
    })
  }

displayMenu(){
  this.displayOptions = !this.displayOptions;
}

  handleResponses() {
    let lenless255 = false;
    this.currentResponse = this.currentResponse.trim();
    if (this.currentResponse.length > 255) {
      lenless255 = true;
    }
    const replyData = {postId: this.postId, content : this.currentResponse, userId: localStorage.getItem("userId"), username: localStorage.getItem("username")};
    this.repliesService.postReply(replyData).subscribe(res => {
      this.responses.push({username: localStorage.getItem("username"), id: res.id, response: res.content, post_id: res.postId, show: res.content.length < 255});
      this.currentResponse = "";
      const textArea = this.textArea.nativeElement;
      textArea.style.overflow = 'hidden';
      textArea.style.height = '36px';
    })
  }

  submitEnter(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      console.log('ctrl', e.ctrlKey, 'key', e.key);
      this.textArea.nativeElement.value += "\n";
      console.log(this.textArea)
    } else if (e.key === 'Enter') {
      this.handleResponses();
    }
  }

  editReply(){
    if(!this.responses[this.toggl].show) this.responses[this.toggl].show = !this.responses[this.toggl].show;
    let currRes = document.getElementById("res"+this.toggl+this.postId);
    let content = currRes.innerHTML;
    document.getElementById("res"+this.toggl+this.postId).contentEditable = "true";
    let textAreaUpdate = document.getElementById("res-inputupdate"+this.toggl+this.postId);
    textAreaUpdate.style.display="block";
    (textAreaUpdate as HTMLInputElement).value=content;
    textAreaUpdate.style.height = 'auto';
    textAreaUpdate.style.height = textAreaUpdate.scrollHeight + 'px';
    currRes.style.display="none";
    textAreaUpdate.focus();
  }


  disableEdit(id){
    document.getElementById("res"+id).contentEditable = "false";
  }

  submitUpdateReply(){
    const reply = {username: localStorage.getItem("username"), id: this.responses[this.toggl].id, content: this.editedResponse, postId: this.postId, userId: 1};
    this.repliesService.updateReply(reply).subscribe();
    document.getElementById("res-inputupdate"+this.toggl+this.postId).style.display="none";
    document.getElementById("res"+this.toggl+this.postId).innerHTML = this.editedResponse;
    document.getElementById("res"+this.toggl+this.postId).style.display="block";
    this.editButton = false;
    this.disableEdit(this.toggl)
  }

  submitDelete(){
    let rem = document.getElementById("box"+this.toggl+this.postId)
    this.repliesService.deleteReply(this.responses[this.toggl].id).subscribe(res => {
    })
    rem.remove();
  }

  changeParam(id:number){
    this.responses.find((x: { id: number; }) => x.id === id).show = true;
  }

  getDisplayType(type:any) {
    return type ? 'inline-table' : 'x';
  }

  autoGrow() {
    const textArea = this.textArea.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  cancelReplyUpdate() {
    this.editButton = false;
    this.disableEdit(this.toggl)
    document.getElementById("res-inputupdate"+this.toggl).style.display="none";
    document.getElementById("res"+this.toggl).style.display="block";
  }
}
