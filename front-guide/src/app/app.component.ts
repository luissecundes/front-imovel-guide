import { Component } from '@angular/core';
import { UserComponent } from './components/tasks/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ListaDeTarefasAngular';
}
