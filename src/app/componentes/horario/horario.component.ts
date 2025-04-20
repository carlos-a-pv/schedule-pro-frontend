import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HeaderComponent } from "../header/header.component";
import { AsignacionHorarioComponent } from "../asignacion-horario/asignacion-horario.component";
import { CommonModule } from '@angular/common';
import { enUS, es } from 'date-fns/locale';
import { format } from 'date-fns'
import { EdicionHorarioComponent } from "../edicion-horario/edicion-horario.component";
import { itemTurnoDTO } from '../../dto/item-turno-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import { ItemEmpleadoDTO } from '../../dto/item-empleado-dto';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [FullCalendarModule, HeaderComponent, AsignacionHorarioComponent, CommonModule, EdicionHorarioComponent],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {

  // Varibles
  totalAsignaciones: number = 24;
  horasAsignadas: number = 156;
  empleadosAsignados: number = 12;
  verAsignacion: boolean = false;
  verEdicion: boolean = false;
  fechaSeleccionada!: string;
  eventoSeleccionado: itemTurnoDTO = {} as itemTurnoDTO;

  eventList: itemTurnoDTO[] = []

  constructor(private adminService: AdministradorService) {
    this.obtenerTurnos();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: this.handleEventClick.bind(this),
    initialView: 'dayGridMonth',
    weekends: true,
    dayCellDidMount: this.estilizarCeldaDia.bind(this),
  }

  handleDateClick(arg: any) {
    const clickedDate = new Date(arg.dateStr);
    const today = new Date();

    clickedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (clickedDate >= today) {
      this.verAsignacion = true;
      const fechaLocal = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate()+1)
      this.fechaSeleccionada = format(fechaLocal, "EEEE, d 'de' MMMM", { locale: es });
    }
  }

  estilizarCeldaDia(info: any) {
    const cellDate = new Date(info.date);
    const today = new Date();
  
    cellDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    if (cellDate < today) {
      info.el.classList.add('past-cell');
    } else {
      info.el.classList.add('hover-cell');
    }
  }

  generarFecha(fechaISO: string): Date {
    return new Date(fechaISO);
  }

  handleEventClick(info: any) {
    const clickedDate = new Date(info.event.startStr);
    const today = new Date();
    
    clickedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    if (clickedDate > today) {
      const evento = this.findEventById(info.event.id);
      if (evento) {
        this.eventoSeleccionado = evento;
      }
      this.verEdicion = true;
      const fechaLocal = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate()+1)
      this.fechaSeleccionada = format(fechaLocal, "EEEE, d 'de' MMMM", { locale: es });
      // const fechaLocal = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate()+1)
      // this.fechaSeleccionada = format(fechaLocal, "EEEE, d 'de' MMMM", { locale: es });
    }
  }

  obtenerTurnos() {
    this.adminService.obtenerTurnos().subscribe({
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

  findEventById(id: string): itemTurnoDTO | undefined {
    return this.eventList.find(event => event.idTurno === id);
  }
}
