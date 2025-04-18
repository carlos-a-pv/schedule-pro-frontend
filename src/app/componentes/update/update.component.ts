import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  actualizarEmpleadoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdministradorService, private cdr : ChangeDetectorRef) {
    this.crearFormulario(); 
  }

    private crearFormulario() {
      this.actualizarEmpleadoForm = this.formBuilder.group({
        cedula: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required]],
        departamento: ['', [Validators.required]],
        cargo: ['', [Validators.required]],
        fechaContratacion: ['', [Validators.required]],
        
      });
    }

  public cleanFields() {
    this.actualizarEmpleadoForm.reset();
  }

  public updateEmployee() {}
}
