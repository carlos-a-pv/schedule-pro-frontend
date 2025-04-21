import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import { itemTurnoDTO } from '../../dto/item-turno-dto';
import { actualizarTurnoDTO } from '../../dto/actualizar-turno-dto';
import { parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { EliminarTurnoDTO } from '../../dto/eliminar-turno-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edicion-horario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edicion-horario.component.html',
  styleUrl: './edicion-horario.component.css'
})
export class EdicionHorarioComponent {

  actualizarHorarioForm!: FormGroup;
  @Output() closeModalEvent = new EventEmitter<void>();
  empleados: ItemEmpleadoDTO[] = [];
  @Input() fechaSeleccionada!: String ;
  @Input() eventoSeleccionado!: itemTurnoDTO;


ngOnInit() {
  this.llenarCampos();
}
  
  constructor(private formBuilder: FormBuilder, private adminService: AdministradorService) {
    this.crearFormulario();
    this.obtenerEmpleados();

  }

  private crearFormulario() {
    this.actualizarHorarioForm = this.formBuilder.group({
          horaInicio: ['', [Validators.required]],
          horaFin: ['', [Validators.required]],
          empleado: ['', [Validators.required]],
          sede: ['', [Validators.required]],
        });
  }

  actualizarAsignacion() {
    const actualizarTurnoDTO = this.actualizarHorarioForm.value as actualizarTurnoDTO;
    actualizarTurnoDTO.idTurno = this.eventoSeleccionado.idTurno;
    const añoActual = new Date().getFullYear();
    const fechaDate = parse(this.fechaSeleccionada + ` ${añoActual}`, "EEEE, d 'de' MMMM yyyy", new Date(), { locale: es });
    actualizarTurnoDTO.fechaTurno = fechaDate;

    console.log('Actualizar Turno DTO:', actualizarTurnoDTO);

    
    this.adminService.editarTurno(actualizarTurnoDTO).subscribe({
      next: (response) => {
        this.cleanFields();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido actualizar el turno',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.cleanFields();
      }
    });
  }

  cleanFields() {
    this.actualizarHorarioForm.reset();
    this.closeModalEvent.emit();
  }

  public obtenerEmpleados() {
    this.adminService.obtenerEmpleados().subscribe((data: ItemEmpleadoDTO[]) => {
      this.empleados = data;
    }, error => {
      console.error('Error al obtener los empleados:', error);
    });
  }

  llenarCampos() {
    this.actualizarHorarioForm.patchValue({
      horaInicio: this.eventoSeleccionado.horaEntrada,
      horaFin: this.eventoSeleccionado.horaSalida,
      empleado: this.eventoSeleccionado.idEmpleado,
      sede: this.eventoSeleccionado.sede,
      
    });
  }

  public eliminarTurno():void {
    const eliminarTurnoDTO: EliminarTurnoDTO = { idTurno: this.eventoSeleccionado.idTurno };
    
    this.adminService.eliminarTurno(eliminarTurnoDTO).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Turno eliminado',
          text: 'El turno se ha eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.cleanFields();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido eliminar el turno',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
