import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../dto/login-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "https://schedule-pro-b55o.onrender.com/api/auth";
  
  constructor(private http: HttpClient) { }

  public login(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
  }
}
