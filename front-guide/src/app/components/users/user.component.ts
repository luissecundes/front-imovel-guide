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
      this.isLoading = true; // Inicia o carregamento
      const newUser: User = form.value;
      this.userService.addUser(newUser).subscribe(
        () => {
          this.loadUsers();
          form.reset();
          this.isLoading = false; // Finaliza o carregamento
        },
        () => {
          this.isLoading = false; // Finaliza mesmo em caso de erro
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
      this.isLoading = true; // Inicia o carregamento
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users.splice(index, 1);
          this.isLoading = false; // Finaliza o carregamento
        },
        () => {
          this.isLoading = false; // Finaliza mesmo em caso de erro
        }
      );
    }
  }
}
