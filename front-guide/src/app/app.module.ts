// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { UserModule } from './components/users/user.module';

@NgModule({
  imports: [BrowserModule, HttpClientModule, UserModule, RouterModule],
})
export class AppModule {}

bootstrapApplication(AppComponent);
