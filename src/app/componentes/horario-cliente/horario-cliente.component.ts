import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeaderClienteComponent } from "../header-cliente/header-cliente.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-horario-cliente',
  standalone: true,
  imports: [HeaderComponent, HeaderClienteComponent, FullCalendarModule],
  templateUrl: './horario-cliente.component.html',
  styleUrl: './horario-cliente.component.css'
})
export class HorarioClienteComponent {

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


  generarFecha(fechaISO: string): Date {
    return new Date(fechaISO);
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

  handleEventClick(info: any) {
    const clickedDate = new Date(info.event.startStr);
    console.log(clickedDate);
    const today = new Date();

    clickedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (clickedDate >= today) {
      // this.verEdicion = true;
      // const fechaLocal = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate()+1)
      // this.fechaSeleccionada = format(fechaLocal, "EEEE, d 'de' MMMM", { locale: es });
    }
  }

    handleDateClick(arg: any) {
      const clickedDate = new Date(arg.dateStr);
      const today = new Date();
  
      clickedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
  
      if (clickedDate >= today) {
        // this.verAsignacion = true;
        const fechaLocal = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), clickedDate.getDate()+1)
        // this.fechaSeleccionada = format(fechaLocal, "EEEE, d 'de' MMMM", { locale: es });
      }
    }
}
