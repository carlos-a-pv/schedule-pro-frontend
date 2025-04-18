import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CrearEmpleadoDTO } from '../../dto/crear-empleado-dto';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';
import Swal from 'sweetalert2';
import { Router, RouterEvent, RouterModule } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { MatDialog } from '@angular/material/dialog';
import { OptionsComponent } from "../options/options.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, ReactiveFormsModule, RouterModule, OptionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  empleados!:ItemEmpleadoDTO [];
  showModal = false;
  isOptionsOpen = false;
  optionsPosition = {x: 0, y: 0};
  crearEmpleadoForm!: FormGroup;
  selectedEmployee: string | null = null;

  constructor(private formBuilder: FormBuilder, private adminService: AdministradorService, private cdr : ChangeDetectorRef) { 
    this.crearFormulario();
    this.empleados = [];
    this.obtenerEmpleados();
  }


  private crearFormulario() {
    this.crearEmpleadoForm = this.formBuilder.group({
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

  public addEmployee(){
    const crearEmpleadoDTO = this.crearEmpleadoForm.value as CrearEmpleadoDTO;
    this.adminService.crearEmpleado(crearEmpleadoDTO).subscribe({
      next: (mensaje) => {
        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        window.location.reload();

      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al crear la cuenta',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })

    this.showModal = false;
  }

  public cleanFields() {
    this.crearEmpleadoForm.reset();
    this.showModal = false;
  }

  public obtenerEmpleados() {
    this.adminService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

 openOptions(event:MouseEvent, email:string) {
  event.stopPropagation();
   const target = event.target as HTMLElement;
   if(!target) return;  
   
   const rect = target.getBoundingClientRect();
   const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
   const scrollY = window.pageYOffset || document.documentElement.scrollTop;
   
   this.optionsPosition = {x: rect.left + scrollX, y: rect.top + scrollY};
   this.cdr.detectChanges();
   this.selectedEmployee = email;
  this.isOptionsOpen = true;
 }


}
