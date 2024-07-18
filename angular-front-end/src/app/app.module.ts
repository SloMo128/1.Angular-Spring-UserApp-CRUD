import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HeaderComponent } from './Shared/header/header.component';
import { UserApiService } from './Service/user.service';
import { AppRoutingUsersModule } from './Routing/user.routing';
import { PageNotFoundComponent } from './Pages/Page-not-found/page.not.found.component';

import { ListUsersComponent } from './Pages/List-Users/list.component';
import { EditUserComponent } from './Pages/Edit-User/edit.user.component';
import { AddUserComponent } from './Pages/Add-User/edit.user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    HeaderComponent,
    PageNotFoundComponent,
    EditUserComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingUsersModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
