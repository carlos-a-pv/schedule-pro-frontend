import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearEmpleadoDTO } from '../dto/crear-empleado-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private adminURL = "onrender./api/usuario/administrador";

  constructor(private http:HttpClient) { }

  public crearEmpleado(crearEmpleadoDTO: CrearEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-evento`, crearEmpleadoDTO);
  }
}
