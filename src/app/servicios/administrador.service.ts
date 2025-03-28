import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearEmpleadoDTO } from '../dto/crear-empleado-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ItemEmpleadoDTO } from '../dto/item-empleado-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private adminURL = "https://schedulepro.onrender.com/api/usuario/administrador";

  constructor(private http:HttpClient) { }

  public crearEmpleado(crearEmpleadoDTO: CrearEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-empleado`, crearEmpleadoDTO);
  }

  public obtenerEmpleados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/listar-todo`);
  }

}
