import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { AdminServiceService } from '../../servicios/admin.service.service';
import { CrearEmpleadoDTO } from '../../dto/crear-empleado-dto';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';



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

  constructor(private formBuilder: FormBuilder, private adminService: AdminServiceService) { 
    this.crearFormulario();
    this.empleados = [];
    // this.obtenerEmpleados();
  }


  private crearFormulario() {
    this.crearEmpleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      fechaContratacion: ['', [Validators.required]],
      
    });
  }

  public addEmployee(){
    const crearEmpleadoDTO = this.crearEmpleadoForm.value as CrearEmpleadoDTO;
    // this.adminService.crearEmpleado(crearEmpleadoDTO).subscribe({
    //   next: (mensaje) => {
    //     Swal.fire()
    //   }
    // })
  }

  // public obtenerEmpleados() {
  //   this.adminService.obtenerEmpleados().subscribe({});
  // }
}
