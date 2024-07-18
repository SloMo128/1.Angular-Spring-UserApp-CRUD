import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../Pages/Page-not-found/page.not.found.component';
import { ListUsersComponent } from '../Pages/List-Users/list.component';
import { EditUserComponent } from '../Pages/Edit-User/edit.user.component';
import { AddUserComponent } from '../Pages/Add-User/edit.user.component';
//import { AddUsersComponent } from '../Pages/Add-Users/add.user.component';

const routes: Routes = [
  { path: 'list', component: ListUsersComponent },
  { path: 'addUser', component: AddUserComponent},
  { path: 'editUser', component: EditUserComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingUsersModule { }
