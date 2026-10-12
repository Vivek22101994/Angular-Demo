import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '',loadComponent:() => import('./pages/home/home').then(m=>m.Home) },
    { path: 'dashboard',canMatch: [authGuard],loadComponent:() => import('./ota-dashboard/ota-dashboard').then(m=>m.OtaDashboard) },
    { path: 'userList',canMatch: [authGuard],loadComponent:() => import('./dashboard/dashboard').then(m=>m.Dashboard) },
    { path: 'inputRef',canMatch: [authGuard],loadComponent:() => import('./input-ref/input-ref').then(m=>m.InputRef) },
    { path: 'adduser',canMatch: [authGuard],loadComponent:() => import('./adduser/adduser').then(m=>m.Adduser) },
    { path: 'timerdemo',canMatch: [authGuard],loadComponent:() => import('./timer-demo/timer-demo').then(m=>m.TimerDemo) },
    { path: 'todo',canMatch: [authGuard],loadComponent:() => import('./todo/todo').then(m=>m.Todo) },
    { path: 'DemoList',canMatch: [authGuard],loadComponent:() => import('./demolist/demolist').then(m=>m.Demolist) },
    { path: '**',loadComponent:() => import('./not-found/not-found').then(m=>m.NotFound) },
];
