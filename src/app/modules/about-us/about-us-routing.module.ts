import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutBlogComponent } from './about-blog/about-blog.component';

const routes: Routes = [
  {path:'', component: AboutUsComponent},
  {path:'about-blog', component: AboutBlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
