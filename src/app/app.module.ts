import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule,
  MatIconModule, MatRadioModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { MinutesToHoursPipe } from './minutes-to-hours.pipe';
import { PathFindingService } from './path-finding.service';


@NgModule({
  declarations: [
    AppComponent,
    MinutesToHoursPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatListModule,
    MatIconModule
  ],
  providers: [ApiService, PathFindingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
