import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddVisitorComponent } from './visitors/add-visitor/add-visitor.component';
import { VisitorListComponent } from './visitors/visitor-list/visitor-list.component';
import { EditVisitorComponent } from './visitors/edit-visitor/edit-visitor.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './tools/material.module';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // Required for everything
    AngularFirestoreModule, // Only required for database features
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AddVisitorComponent,
    VisitorListComponent,
    EditVisitorComponent,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
