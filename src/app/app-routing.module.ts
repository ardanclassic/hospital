import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AddVisitorComponent } from './visitors/add-visitor/add-visitor.component';
import { VisitorListComponent } from './visitors/visitor-list/visitor-list.component';
import { EditVisitorComponent } from './visitors/edit-visitor/edit-visitor.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'task', component: MenuComponent},
  {path: 'visitor/add', component: AddVisitorComponent},
  {path: 'visitor/list', component: VisitorListComponent},
  {path: 'visitor/edit/:id', component: EditVisitorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
