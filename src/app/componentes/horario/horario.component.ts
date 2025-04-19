import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HeaderComponent } from "../header/header.component";
import { AsignacionHorarioComponent } from "../asignacion-horario/asignacion-horario.component";
import { CommonModule } from '@angular/common';

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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    initialView: 'dayGridMonth',
    weekends: false,
    dayCellDidMount: this.estilizarCeldaDia.bind(this),
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  }

  handleDateClick(arg: any) {
    // alert('date click! ' + arg.dateStr);
    this.verAsignacion = true;
  }

  estilizarCeldaDia(info: any) {
    info.el.classList.add('hover-cell');
  }
}
