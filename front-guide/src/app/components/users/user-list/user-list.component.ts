// src/app/user/components/user-list/user-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users = [{ name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Bob Smith' }];
}

