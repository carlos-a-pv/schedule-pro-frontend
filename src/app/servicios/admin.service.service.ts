import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearEmpleadoDTO } from '../dto/crear-empleado-dto';
import { MensajeDTO } from '../dto/mensaje-dto';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private adminURL = 'http://localhost:8080/api/admin';
   
  constructor(private http:HttpClient) { }

  public crearEmpleado(empleado: CrearEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.adminURL + '/crear-empleado', empleado);
  }

  public obtenerEmpleados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-todo/`);
  }
}
