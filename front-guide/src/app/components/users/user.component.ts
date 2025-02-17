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
  currentUser: User = { id: 0, name: '', cpf: '', creci: '' };
  isEditMode: boolean = false;
  isLoading: boolean = false;
  cpfError: boolean = false;
  creciError: boolean = false;
  nameError: boolean = false;
  successMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((dado) => {
      this.users = dado.users || [];
    });
  }

  onSubmit(form: any): void {
    this.validateForm();

    if (form.valid && !this.cpfError && !this.creciError && !this.nameError) {
      this.isLoading = true;
      this.successMessage = '';

      console.log('Dados enviados para o backend:', this.currentUser);
      this.currentUser.cpf = this.currentUser.cpf.replace(/\D/g, '');

      if (this.isEditMode) {
        this.userService
          .updateUser(this.currentUser.id ?? 0, this.currentUser)
          .subscribe(
            () => {
              this.loadUsers();
              this.successMessage = 'Usuário atualizado com sucesso!';
              this.resetForm();
            },
            (error) => {
              this.isLoading = false;
              console.error(error);
            }
          );
      } else {
        this.userService.addUser(this.currentUser).subscribe(
          () => {
            this.loadUsers();
            this.successMessage = 'Usuário cadastrado com sucesso!';
            this.resetForm();
          },
          (error) => {
            this.isLoading = false;
            console.error(error);
          }
        );
      }
    }
  }

  validateForm(): void {
    this.cpfError = this.currentUser.cpf.replace(/\D/g, '').length !== 11;
    this.creciError = this.currentUser.creci.length < 3;
    this.nameError = this.currentUser.name.length < 3; 
  }

  editUser(index: number): void {
    const user = this.users[index];
    this.currentUser = { ...user };
    this.isEditMode = true;
  }

  resetForm(): void {
    this.currentUser = { id: 0, name: '', cpf: '', creci: '' };
    this.isEditMode = false;
    this.isLoading = false;
    this.cpfError = false;
    this.creciError = false;
  }

  deleteUser(index: number): void {
    const userId = this.users[index].id;
    if (userId) {
      this.isLoading = true;
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users.splice(index, 1);
          this.successMessage = 'Usuário excluído com sucesso!';
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
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

  formatCpfDisplay(cpf: string): string {
    if (!cpf) return '';
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  }

  cancelEdit(): void {
    this.resetForm();
  }
}
