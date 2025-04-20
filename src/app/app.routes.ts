import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RolesGuard } from './guards/roles.service';
import { RecursoNoEncontradoComponent } from './componentes/recurso-no-encontrado/recurso-no-encontrado.component';
import { HorarioComponent } from './componentes/horario/horario.component';
import { HorarioClienteComponent } from './componentes/horario-cliente/horario-cliente.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: HomeComponent, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR']}},
    {path: 'horarios', component: HorarioComponent, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR']}},
    {path: 'mis-horarios', component: HorarioClienteComponent},
    {path: "**", component: RecursoNoEncontradoComponent},
];
