// src/app/user/user.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [],
  imports: [
    UserListComponent,
    UserFormComponent,
    CommonModule,
    FormsModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
