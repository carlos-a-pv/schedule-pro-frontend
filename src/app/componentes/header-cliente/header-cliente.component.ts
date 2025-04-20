import { Component } from '@angular/core';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header-cliente',
  standalone: true,
  imports: [],
  templateUrl: './header-cliente.component.html',
  styleUrl: './header-cliente.component.css'
})
export class HeaderClienteComponent {
  
    constructor(private tokenService: TokenService) { }
  
    public logout(){
      this.tokenService.logout();
    }
}
