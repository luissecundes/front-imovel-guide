// src/app/user/components/user-form/user-form.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  user = { name: '', email: '' };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.registerUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
