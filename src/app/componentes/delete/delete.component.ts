import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { EliminarEmpleadoDTO } from '../../dto/eliminar-empleado-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input() isDeleteOpen = false;
  @Input() empleado: any;
  @Output() closeModalEvent = new EventEmitter<void>();
  
  constructor(private adminService: AdministradorService ) { }

  closeModal(){
    this.isDeleteOpen = false;
    this.closeModalEvent.emit();
  }

  confirmDelete(){
    const employeeId = this.empleado.id as EliminarEmpleadoDTO;
    console.log(employeeId)
    this.adminService.eliminarEmpleado(employeeId).subscribe({
      next: (mensaje) => {
        Swal.fire({
          title: 'Cuenta eliminada',
          text: 'La cuenta se ha eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido eliminar la cuenta',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      },
      complete: () => {
        
      }

    });
    
    this.closeModal();
  }

  cancelDelete(){
    this.closeModal();
  }
}
