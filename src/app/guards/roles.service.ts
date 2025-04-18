import { inject, Injectable } from '@angular/core';
import { TokenService } from '../servicios/token.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  realRole: string = '';
  
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole: string[] = next.data['expectedRole'];
    this.realRole = this.tokenService.getRol();

    if(!this.tokenService.isLogged() || !expectedRole.some( r => this.realRole.includes(r))){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


}

export const RolesGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RolesService).canActivate(next, state);
 }
