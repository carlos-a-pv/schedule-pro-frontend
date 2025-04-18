import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginDTO } from '../../dto/login-dto';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import Swal from 'sweetalert2';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService, private spinner: NgxSpinnerService) { 
    this.createFormLogin();
  }

  private createFormLogin(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(25)]]
     })
  }

  public login(): void {

    this.spinner.show();

    const loginDTO = this.loginForm.value as LoginDTO;
    
    this.authService.login(loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta.token);
      },
      error: (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta
        });
      },
      complete: () => {
        this.spinner.hide();
      }
    });
   
  }
}
