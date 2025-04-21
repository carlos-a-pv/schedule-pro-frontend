import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeaderClienteComponent } from "../header-cliente/header-cliente.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AdministradorService } from '../../servicios/administrador.service';
import { itemTurnoDTO } from '../../dto/item-turno-dto';
import { TokenService } from '../../servicios/token.service';
import { EmpleadoServiceService } from '../../servicios/empleado-service.service';

@Component({
  selector: 'app-horario-cliente',
  standalone: true,
  imports: [HeaderClienteComponent, FullCalendarModule],
  templateUrl: './horario-cliente.component.html',
  styleUrl: './horario-cliente.component.css'
})
export class HorarioClienteComponent {

  eventList: itemTurnoDTO[] = []
  idEmpleado: string = "";
  verDetalleEvento: boolean = false;
  eventoSeleccionado: itemTurnoDTO | null = null;

  constructor(private empleadoService: EmpleadoServiceService, private tokenService: TokenService) { 
    this.idEmpleado = this.tokenService.getIdCuenta() ?? '';
    this.obtenerTurnos();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    // dateClick: (arg) => this.handleDateClick(arg),
    eventClick: this.handleEventClick.bind(this),
    initialView: 'dayGridMonth',
    weekends: true,
    // dayCellDidMount: this.estilizarCeldaDia.bind(this),
  }


  generarFecha(fechaISO: string): Date {
    return new Date(fechaISO);
  }

  // estilizarCeldaDia(info: any) {
  //   const cellDate = new Date(info.date);
  //   const today = new Date();
  
  //   cellDate.setHours(0, 0, 0, 0);
  //   today.setHours(0, 0, 0, 0);
  
  //   if (cellDate < today) {
  //     info.el.classList.add('past-cell');
  //   } else {
  //     info.el.classList.add('hover-cell');
  //   }
  // }

  handleEventClick(info: any) {

    this.verDetalleEvento = true;
    this.eventoSeleccionado = this.eventList.find(event => event.idTurno === info.event.id) || null;
    // const clickedDate = new Date(info.event.startStr);
    // console.log(clickedDate);
    // const today = new Date();

    // clickedDate.setHours(0, 0, 0, 0);
    // today.setHours(0, 0, 0, 0);

    // if (clickedDate >= today) {
    //   // this.verEdicion = true;
    //   // const fechaLocal = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate()+1)
    //   // this.fechaSeleccionada = format(fechaLocal, "EEEE, d 'de' MMMM", { locale: es });
    // }
  }

    // handleDateClick(arg: any) {
    //   const clickedDate = new Date(arg.dateStr);
    //   const today = new Date();
  
    //   clickedDate.setHours(0, 0, 0, 0);
    //   today.setHours(0, 0, 0, 0);
  
    //   if (clickedDate >= today) {
    //     // this.verAsignacion = true;
    //     const fechaLocal = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate()+1)
    //     // this.fechaSeleccionada = format(fechaLocal, "EEEE, d 'de' MMMM", { locale: es });
    //   }
    // }

  obtenerTurnos() {
    this.empleadoService.obtenerTurnos(this.idEmpleado).subscribe({
      next: (response) => {
        this.eventList = response;
        this.calendarOptions.events = this.eventList.map(event => ({
          id: event.idTurno,
          title: event.horaEntrada.slice(0,2) + "-" + event.horaSalida.slice(0,2)+": " + event.nombreEmpleado,
          start: event.fechaTurno,
          end: event.fechaTurno,
          allDay: true
        }));
      },
      error: (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    });
  }

  cerrarModal() {
    this.verDetalleEvento = false;
    this.eventoSeleccionado = null;
  }
}
