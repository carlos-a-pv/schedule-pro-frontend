import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RolesGuard } from './guards/roles.service';
import { RecursoNoEncontradoComponent } from './componentes/recurso-no-encontrado/recurso-no-encontrado.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [RolesGuard], data: { expectedRole: ['ADMINISTRADOR']}},
    {path: "**", component: RecursoNoEncontradoComponent},
];
