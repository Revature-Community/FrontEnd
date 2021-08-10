import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WritepostComponent } from './writepost/writepost.component';
import { ReadpostComponent } from './readpost/readpost.component';
import { PostsService } from '../posts.service';
import { FormsModule } from '@angular/forms';
import { ResponseComponent } from '../response/response.component';
import { ResponsePipePipe } from '../response-pipe.pipe';




@NgModule({
  declarations: [
    WritepostComponent,
    ReadpostComponent,
    ResponsePipePipe,
    ResponseComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    WritepostComponent,
    ReadpostComponent
  ]
})
export class PostsModule { }
