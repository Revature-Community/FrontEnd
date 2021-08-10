import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ResponsePipePipe } from './response-pipe.pipe';
import { LocationComponent } from './location/location.component';
import { TopnavComponent } from './topnav/topnav.component';
import { FooterComponent } from './footer/footer.component';
import { PostsModule } from './posts/posts.module';
import { LandingComponent } from './landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from './posts.service';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core'; 
import { GeocodingComponent } from './geocoding/geocoding.component'
import { CookieService } from 'ngx-cookie-service';
          
@NgModule({
  declarations: [
    AppComponent,
    // ResponsePipePipe,
    LocationComponent,
    TopnavComponent,
    FooterComponent,
    LandingComponent,
    GeocodingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PostsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: '', 
      libraries: ['places']
    })
    
  ],
  providers: [ResponsePipePipe, PostsService, GoogleMapsAPIWrapper, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
