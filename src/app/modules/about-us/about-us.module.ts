import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutBlogComponent } from './about-blog/about-blog.component';


@NgModule({
  declarations: [
    AboutUsComponent,
    AboutBlogComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ],
  exports: [],
  providers: [ ]
})
export class AboutUsModule { }
