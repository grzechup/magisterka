import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from "src/app/layout/main-view/main-view.component";
import {ArticleViewComponent} from "src/app/layout/post-view/article-view.component";
import {AppComponent} from "src/app/app.component";
import {PostCreateViewComponent} from "src/app/layout/post-create-view/post-create-view.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: MainViewComponent},
      {path: 'post', component: ArticleViewComponent},
      {path: 'post-create', component: PostCreateViewComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
