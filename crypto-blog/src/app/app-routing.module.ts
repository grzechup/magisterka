import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from "src/app/layout/main-view/main-view.component";
import {PostViewComponent} from "src/app/layout/post-view/post-view.component";
import {AppComponent} from "src/app/app.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: MainViewComponent},
      {path: 'post', component: PostViewComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
