// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, HttpClientModule, UserModule, RouterModule],
})
export class AppModule {}

bootstrapApplication(AppComponent);
