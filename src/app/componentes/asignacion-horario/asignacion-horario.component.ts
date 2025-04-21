import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';
import { parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { AsignarTurnoDTO } from '../../dto/asignar-turno-dto';
import Swal from 'sweetalert2';

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
          idEmpleado: ['', [Validators.required]],
          horaEntrada: ['', [Validators.required]],
          horaSalida: ['', [Validators.required]],
          sede: ['', [Validators.required]],
        });

  } 

  public cleanFields() {
    this.asignarHorarioForm.reset();
    this.closeModalEvent.emit();
    
  }

  public addAsignacion() {
    const crearTurnoDTO = this.asignarHorarioForm.value as AsignarTurnoDTO;
    const añoActual = new Date().getFullYear();

    const fechaDate = parse(this.fechaSeleccionada + ` ${añoActual}`, "EEEE, d 'de' MMMM yyyy", new Date(), { locale: es });
    crearTurnoDTO.fechaTurno = fechaDate;
    // crearTurnoDTO.sede = "Sede "+Math.floor(Math.random() * 10);

    this.adminService.asignarTurno(crearTurnoDTO).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Asignación exitosa',
          text: 'El turno ha sido asignado correctamente.',
          
        });
        this.asignarHorarioForm.reset();
        this.closeModalEvent.emit();
      },
      error: (error) => {
        this.closeModalEvent.emit();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo asignar el turno.', 
      });
    }});
  }

  public obtenerEmpleados() {
    this.adminService.obtenerEmpleados().subscribe((data: ItemEmpleadoDTO[]) => {
      this.empleados = data;
    }, error => {
      console.error('Error al obtener los empleados:', error);
    });
  }
}
