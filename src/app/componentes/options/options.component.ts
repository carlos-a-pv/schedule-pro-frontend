import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, HostListener, Input, Output } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { EliminarEmpleadoDTO } from '../../dto/eliminar-empleado-dto';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from "../delete/delete.component";
import { UpdateComponent } from "../update/update.component";

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DeleteComponent, UpdateComponent],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {

  @Input() isOpen = false;
  @Input() position = {x: 0 , y: 0};
  @Input() idEmpleado!:any;
  showModal = false;
  actualizarEmpleado!: FormGroup;
  empleado!: any;
  bloquearCierre = false;
  isDeleteOpen = false;
  isUpdateOpen = false;

  selectedEmpleadoEmail: string | null = null;

  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private adminService:AdministradorService,private cdr: ChangeDetectorRef ) { 
    console.log("Usuario elegido:" + this.idEmpleado);
    // console.log(this.idEmpleado);

  }

  @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    
    if (!clickedInside && !this.bloquearCierre) {
      this.closeModalEvent.emit();
    }
}


  public deleteEmployee(event: MouseEvent){
    event.stopPropagation();
    this.isDeleteOpen = true;    
    this.bloquearCierre = true;
  }

  updateEmployee(event: MouseEvent){
    event.stopPropagation();
    this.isUpdateOpen = true;    
    this.bloquearCierre = true;

  }

  public handleOptionsClose(){
    this.selectedEmpleadoEmail = null;

  }

  public handleDeleteClose(){
    this.isDeleteOpen = false;
    this.bloquearCierre = false;

    
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  public handleUpdateClose(){
    this.isUpdateOpen = false;
    this.bloquearCierre = false;

    
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }
}
