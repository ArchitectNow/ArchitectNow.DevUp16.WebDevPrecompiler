import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";


export const APP_ROUTES: Routes = [
    {path: 'index.html', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    // example of lazy loaded module
    {path: 'about', loadChildren: './components/+about/about.module#AboutModule'}
];
