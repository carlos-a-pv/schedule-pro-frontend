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
  empleadosFiltrados!:ItemEmpleadoDTO [];
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
      precioHora: ['', [Validators.required]],
      
    });
  }

  public addEmployee(){
    // console.log(this.crearEmpleadoForm.value);
    const crearEmpleadoDTO = this.crearEmpleadoForm.value as CrearEmpleadoDTO;
    this.adminService.crearEmpleado(crearEmpleadoDTO).subscribe({
      next: (mensaje) => {
        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        

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
    
    this.cleanFields();
  }

  public cleanFields() {
    this.crearEmpleadoForm.reset();
    this.showModal = false;
    this.obtenerEmpleados();
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

 onTyping(evento : Event) {
   const input = evento.target as HTMLInputElement;
   const itemSearch = input.value.toLowerCase();
   
   console.log(typeof itemSearch );

      if (itemSearch.trim() === '') {
        this.empleados = [...this.empleados];
        return;
      }

    this.empleadosFiltrados = this.empleados.filter((empleado) =>
      empleado.nombre.toLowerCase().includes(itemSearch) ||
      empleado.apellido.toLowerCase().includes(itemSearch) ||
      empleado.email.toLowerCase().includes(itemSearch)
    );

    if (this.empleadosFiltrados.length > 0) {
      this.empleados = [...this.empleadosFiltrados];
    } else {
      Swal.fire({
        title: 'No se encontraron resultados',
        text: 'No se encontraron empleados con ese criterio de búsqueda',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      this.obtenerEmpleados();
    }


} 



}
