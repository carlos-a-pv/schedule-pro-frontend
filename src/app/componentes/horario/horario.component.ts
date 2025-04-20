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

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [FullCalendarModule, HeaderComponent, AsignacionHorarioComponent, CommonModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {

  // Varibles
  totalAsignaciones: number = 24;
  horasAsignadas: number = 156;
  empleadosAsignados: number = 12;
  verAsignacion: boolean = false;
  fechaSeleccionada!: string;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: this.handleEventClick.bind(this),
    initialView: 'dayGridMonth',
    weekends: true,
    dayCellDidMount: this.estilizarCeldaDia.bind(this),
    events: [
      { title: 'Reunión equipo A', start: this.generarFecha('2025-04-08T10:00:00') },
      { title: 'Reunión equipo A', start: this.generarFecha('2025-04-08T10:00:00') },
      { title: 'Capacitación interna', start: this.generarFecha('2025-04-12T14:00:00') },
      { title: 'Entrega reporte', start: this.generarFecha('2025-04-15T09:00:00') },
      { title: 'Llamada con cliente', start: this.generarFecha('2025-04-20T11:00:00') },
      { title: 'Cierre mensual', start: this.generarFecha('2025-04-25T16:00:00') },
      { title: 'Taller técnico', start: this.generarFecha('2025-04-28T13:00:00') }
    ]
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
    alert('Evento: ' + info.event.title + '\nFecha: ' + info.event.start?.toISOString());
  }
}
