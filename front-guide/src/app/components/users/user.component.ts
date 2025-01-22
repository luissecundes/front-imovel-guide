import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((dado) => {
      console.log(dado);
      this.users = dado.users || [];
    });
  }

  editUser(index: number): void {
  }

  onSubmit(form: any): void {
    if (form.valid) {
      form.reset();
    }
  }

  deleteUser(index: number): void {}
}
