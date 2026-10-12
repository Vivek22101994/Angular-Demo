// auth.guard.ts
import { inject } from '@angular/core';
import { Router,CanMatchFn } from '@angular/router';
import { AuthService } from './auth';
import { map } from 'rxjs/operators';

export const authGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map(isValid => {
      if (isValid) return true;
      return router.createUrlTree(['/'], {
        queryParams: {
          returnUrl: '/' + state.map(s => s.path).join('/')
        }
      });
      return false;
    })
  );
};