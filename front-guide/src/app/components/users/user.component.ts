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
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  tarefas: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((dado) => {
      this.tarefas = dado;
      console.log(dado);
    });
  }

  // Método para editar um usuário (ainda não implementado)
  editUser(index: number): void {
    // Aqui você pode implementar a lógica para editar o usuário
  }

  onSubmit(form: any): void {
    if (form.valid) {
      form.reset(); // Limpar o formulário após o envio
    }
  }

  // Método para excluir um usuário
  deleteUser(index: number): void {}
}
