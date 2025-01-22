// src/app/app.component.ts
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: any[] = [];

  // Método para adicionar os dados do formulário à tabela
  addUser(nome: string, cpf: string, creci: string): void {
    const newUser = { nome, cpf, creci };
    this.users.push(newUser);
  }

  // Método que é chamado quando o formulário é enviado
  onSubmit(form: any): void {
    if (form.valid) {
      this.addUser(form.value.nome, form.value.cpf, form.value.creci);
      form.reset(); // Limpar o formulário após o envio
    }
  }

  // Método para editar um usuário (ainda não implementado)
  editUser(index: number): void {
    // Aqui você pode implementar a lógica para editar o usuário
    console.log('Editando usuário:', this.users[index]);
  }

  // Método para excluir um usuário
  deleteUser(index: number): void {
    this.users.splice(index, 1); // Remove o usuário da lista
  }
}
