import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemTurnoDTO } from '../dto/item-turno-dto';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
  private empleadoURL = "https://schedulepro.onrender.com/api/usuario/empleado";

  constructor(private htttp:HttpClient) { }

  public obtenerTurnos(idEmpleado: String): Observable<itemTurnoDTO[]> {
    return this.htttp.get<itemTurnoDTO[]>(`${this.empleadoURL}/listar-turnos-empleado/${idEmpleado}`);
  }
}
