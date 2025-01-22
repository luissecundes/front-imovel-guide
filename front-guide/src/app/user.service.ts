// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // O serviço é injetado automaticamente na aplicação
})
export class UserService {
  private apiUrl = 'http://localhost:8989/api/user/register'; // URL da API

  constructor(private http: HttpClient) {}

  // Método para enviar os dados do usuário para o backend
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData); // Envia os dados via POST
  }
}
