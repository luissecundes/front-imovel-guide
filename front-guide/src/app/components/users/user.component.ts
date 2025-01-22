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
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((dado) => {
      console.log(dado);
      this.users = dado.users || [];
    });
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.isLoading = true; 
      const newUser: User = form.value;
      this.userService.addUser(newUser).subscribe(
        () => {
          this.loadUsers();
          form.reset();
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  editUser(index: number): void {
    // Implementar lógica de edição se necessário
  }

  deleteUser(index: number): void {
    const userId = this.users[index].id;
    if (userId) {
      this.isLoading = true;
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users.splice(index, 1);
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  formatCpf(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    input.value = value;
  }
}
