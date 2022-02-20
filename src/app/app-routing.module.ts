import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputVisitorDetailsComponent } from './input-visitor-details/input-visitor-details.component';
import { MenuComponent } from './menu/menu.component';
import { RequestQueueNumberComponent } from './request-queue-number/request-queue-number.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'task', component: MenuComponent},
  {path: 'request-queue-number', component: RequestQueueNumberComponent},
  {path: 'input_visitor_details', component: InputVisitorDetailsComponent},
  {path: 'visitor-list', component: VisitorListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
