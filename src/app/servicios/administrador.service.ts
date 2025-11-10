import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearEmpleadoDTO } from '../dto/crear-empleado-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ItemEmpleadoDTO } from '../dto/item-empleado-dto';
import { EliminarEmpleadoDTO } from '../dto/eliminar-empleado-dto';
import { AsignarTurnoDTO } from '../dto/asignar-turno-dto';
import { itemTurnoDTO } from '../dto/item-turno-dto';
import { actualizarTurnoDTO } from '../dto/actualizar-turno-dto';
import { EliminarTurnoDTO } from '../dto/eliminar-turno-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private adminURL = "https://schedule-pro-b55o.onrender.com/api/usuario/administrador";
  
  
  

  constructor(private http:HttpClient) { }

  public crearEmpleado(crearEmpleadoDTO: CrearEmpleadoDTO): Observable<MensajeDTO> {
    console.log(`${this.adminURL}/crear-empleado`);
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-empleado`, crearEmpleadoDTO);
  }

  // public obtenerEmpleados(): Observable<MensajeDTO> {
  //   return this.http.get<MensajeDTO>(`${this.adminURL}/listar-todo`);
  // }

  public obtenerEmpleados(): Observable<ItemEmpleadoDTO[]> {
    return this.http.get<ItemEmpleadoDTO[]>(`${this.adminURL}/listar-todo`);
  }

  public eliminarEmpleado(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-empleado/${id}`);
  }

  public actualizarEmpleado(item: CrearEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/editar-empleado`, item);
  }

  public obtenerEmpleadoPorId(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-empleado/${id}`);
  }

  //MANEJO DE TURNOS
  public asignarTurno(turnoDTO: AsignarTurnoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/asignar-turno`, turnoDTO);
  }

  public obtenerTurnos(): Observable<itemTurnoDTO[]> {
    return this.http.get<itemTurnoDTO[]>(`${this.adminURL}/listar-turnos`);
  }

  public obtenerTurnoPorId(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-turno/${id}`);
  }

  public editarTurno(turnoDTO: actualizarTurnoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/editar-turno`, turnoDTO);
  }

  public eliminarTurno(turnoDTO: EliminarTurnoDTO): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-turno`, { body: turnoDTO });
  }

  public obtenerTurnosPorEmpleado(id: string): Observable<itemTurnoDTO[]> {
    return this.http.get<itemTurnoDTO[]>(`${this.adminURL}/listar-turnos-empleado/${id}`);
  }

}
