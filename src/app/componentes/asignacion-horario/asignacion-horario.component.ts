import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';

@Component({
  selector: 'app-asignacion-horario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignacion-horario.component.html',
  styleUrl: './asignacion-horario.component.css'
})
export class AsignacionHorarioComponent {
  asignarHorarioForm!: FormGroup;
  empleados: ItemEmpleadoDTO[] = [];

  constructor(private formBuilder: FormBuilder, private adminService: AdministradorService) {
    this.crearFormulario();
    this.obtenerEmpleados();
    
  }

  private crearFormulario() {
    this.asignarHorarioForm = this.formBuilder.group({
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

  }

  public addAsignacion() {

  }

  public obtenerEmpleados() {
    this.adminService.obtenerEmpleados().subscribe((data: ItemEmpleadoDTO[]) => {
      this.empleados = data;
    }, error => {
      console.error('Error al obtener los empleados:', error);
    });
  }
}
