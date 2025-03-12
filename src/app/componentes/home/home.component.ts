import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CrearEmpleadoDTO } from '../../dto/crear-empleado-dto';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  empleados!:ItemEmpleadoDTO [];
  showModal = false;
  crearEmpleadoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdministradorService) { 
    this.crearFormulario();
    this.empleados = [];
    // this.obtenerEmpleados();
  }


  private crearFormulario() {
    this.crearEmpleadoForm = this.formBuilder.group({
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
    // console.log(crearEmpleadoDTO);
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

  // public obtenerEmpleados() {
  //   this.adminService.obtenerEmpleados().subscribe({});
  // }
}
