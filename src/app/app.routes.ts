import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '',loadComponent:() => import('./pages/home/home').then(m=>m.Home) },
    { path: 'dashboard',canMatch: [authGuard],loadComponent:() => import('./ota-dashboard/ota-dashboard').then(m=>m.OtaDashboard) },
    { path: 'userList',loadComponent:() => import('./dashboard/dashboard').then(m=>m.Dashboard) },
    { path: 'inputRef',loadComponent:() => import('./input-ref/input-ref').then(m=>m.InputRef) },
    { path: 'adduser',loadComponent:() => import('./adduser/adduser').then(m=>m.Adduser) },
    { path: 'timerdemo',loadComponent:() => import('./timer-demo/timer-demo').then(m=>m.TimerDemo) },
    { path: 'todo',loadComponent:() => import('./todo/todo').then(m=>m.Todo) },
    { path: 'DemoList',loadComponent:() => import('./demolist/demolist').then(m=>m.Demolist) },
    { path: 'nameForm',loadComponent:() => import('./nameform/nameform').then(m=>m.Nameform) },
    { path: 'switchMap',loadComponent:() => import('./switch-map-demo/switch-map-demo').then(m=>m.SwitchMapDemo) },
    { path: 'concatmap',loadComponent:() => import('./concatmap/concatmap').then(m=>m.Concatmap) },
    { path: '**',loadComponent:() => import('./not-found/not-found').then(m=>m.NotFound) },
];
