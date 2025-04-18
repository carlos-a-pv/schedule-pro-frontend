import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recurso-no-encontrado',
  standalone: true,
  imports: [],
  templateUrl: './recurso-no-encontrado.component.html',
  styleUrl: './recurso-no-encontrado.component.css'
})
export class RecursoNoEncontradoComponent {

  constructor(private router: Router) { }

  public volver(): void {
    this.router.navigate(['']);

  } 
}
