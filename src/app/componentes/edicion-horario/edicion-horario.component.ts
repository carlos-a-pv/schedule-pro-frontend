import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';
import { AdministradorService } from '../../servicios/administrador.service';

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

    constructor(private formBuilder: FormBuilder, private adminService: AdministradorService) {
      this.crearFormulario();
      // this.obtenerEmpleados();
      
    }
  
    private crearFormulario() {
      this.actualizarHorarioForm = this.formBuilder.group({
            horaInicio: ['', [Validators.required]],
            horaFin: ['', [Validators.required]],
            empleado: ['', [Validators.required]],
            
          });
  
    }

  actualizarAsignacion() {}

  cleanFields() {
    this.actualizarHorarioForm.reset();
    this.closeModalEvent.emit();
  }

}
