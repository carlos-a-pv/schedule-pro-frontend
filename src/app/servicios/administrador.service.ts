import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearEmpleadoDTO } from '../dto/crear-empleado-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ItemEmpleadoDTO } from '../dto/item-empleado-dto';
import { EliminarEmpleadoDTO } from '../dto/eliminar-empleado-dto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private adminURL = "https://schedulepro.onrender.com/api/usuario/administrador";
  

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

  public eliminarEmpleado(item: EliminarEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-empleado`);
  }

  public actualizarEmpleado(item: CrearEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/actualizar-empleado`, item);
  }

  public obtenerEmpleadoPorId(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/obtener-empleado/${id}`);

  }

}
