import { Injectable }     from '@angular/core';
import { CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot }    from '@angular/router';

import { Store } from '../store/Store';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     

        if (!this.store || !this.store.currentUser) {
            console.log('No token found, redirect to login');

            this.router.navigate(['/login']);

            return false;
        }
        else {
            return true;
        }
    }
}