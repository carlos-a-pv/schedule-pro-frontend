import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private tokenService: TokenService) { }

  public logout(){
    this.tokenService.logout();
  }
}
