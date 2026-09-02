/* eslint-disable @typescript-eslint/no-unused-vars */
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import { AuthService } from "../auth-service/auth-service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

     return true;
    // if (authService.isAuthorized()) {
    //   return true;
    // }
    // else {
    //  return router.parseUrl('/not-authorized')
    // }
}
