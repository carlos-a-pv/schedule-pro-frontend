import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() fechaSeleccionada!: String ;

  constructor(private formBuilder: FormBuilder, private adminService: AdministradorService) {
    this.crearFormulario();
    this.obtenerEmpleados();
    
  }

  private crearFormulario() {
    this.asignarHorarioForm = this.formBuilder.group({
          horaInicio: ['', [Validators.required]],
          horaFin: ['', [Validators.required]],
          empleado: ['', [Validators.required]],
          
        });

  } 

  public cleanFields() {
    this.asignarHorarioForm.reset();
    this.closeModalEvent.emit();
    
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
