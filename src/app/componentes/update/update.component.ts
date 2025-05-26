import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';
import Swal from 'sweetalert2';
import { ActulizarEmpleadoDTO } from '../../dto/actualizar-empleado-dto';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  actualizarEmpleadoForm!: FormGroup;
  @Input() idEmpleado!:string;
  @Output() closeModalEvent = new EventEmitter<void>();

  empleado !: ItemEmpleadoDTO;

  ngOnInit() {
    this.obtenerEmpleadoPorId(this.idEmpleado); 
  }

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
        precioHora: ['', [Validators.required]],
        
      });
    }

  public cleanFields() {
    this.actualizarEmpleadoForm.reset();
    this.closeModalEvent.emit();
    
  }

  public obtenerEmpleadoPorId(idEmpleado: string) {
    this.adminService.obtenerEmpleadoPorId(idEmpleado).subscribe({
      next: (response) => {
        this.empleado = response.respuesta;
        this.actualizarEmpleadoForm.patchValue({
          cedula: this.empleado.cedula,
          nombre: this.empleado.nombre,
          apellido: this.empleado.apellido,
          email: this.empleado.email,
          telefono: this.empleado.telefono,
          departamento: this.empleado.departamento,
          cargo: this.empleado.cargo,
          fechaContratacion: this.empleado.fechaContratacion,
          precioHora: this.empleado.precioHora
        });
      },
      error: (error) => {
        console.error('Error al obtener el empleado:', error);
      }
    })
  }

  public updateEmployee() {
    const actualizarEmpleadoDTO = this.actualizarEmpleadoForm.value as ActulizarEmpleadoDTO;
        this.adminService.actualizarEmpleado(actualizarEmpleadoDTO).subscribe({
          next: (mensaje) => {
            Swal.fire({
              title: 'Cuenta actulizada',
              text: 'La cuenta se ha actualizado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
            window.location.reload();
    
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al actualizar la cuenta',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        })
  }
    
}
