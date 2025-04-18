import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../servicios/token.service';
import { inject } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const isApiAuth = req.url.includes("api/auth");
  // const isAPiPublico = req.url.includes("api/publico");
 
 
  if (!tokenService.isLogged() || isApiAuth) {
    return next(req);
  }
 
 
  const token = tokenService.getToken();
 

  try {
    const decoded: any = jwtDecode(token!);
    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp < now) {
      tokenService.logout();
      return next(req);
    }
  } catch (error) {
    tokenService.logout();
    return next(req);
  }
 
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
