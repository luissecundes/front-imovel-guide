import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../User';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  @Input() tarefa!: User;
  @Output() onDeleteTask = new EventEmitter<User>();
  @Output() onToggleConcluido = new EventEmitter<User>();

  faTimes = faTimes;

  onDelete(tarefa: User) {
    this.onDeleteTask.emit(tarefa);
  }

  onToggle(tarefa: User) {
    this.onToggleConcluido.emit(tarefa);
  }
}
