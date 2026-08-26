import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { InputRef } from './input-ref/input-ref';
import { Adduser } from './adduser/adduser';

export const routes: Routes = [
    { path: '',loadComponent:() => import('./pages/home/home').then(m=>m.Home) },
    { path: 'dashboard',canActivate: [authGuard],loadComponent:() => import('./dashboard/dashboard').then(m=>m.Dashboard) },
    { path: 'inputRef',canActivate: [authGuard],loadComponent:() => import('./input-ref/input-ref').then(m=>m.InputRef) },
    { path: 'adduser',canActivate: [authGuard],loadComponent:() => import('./adduser/adduser').then(m=>m.Adduser) },

];
