import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ShellComponent } from "./components/shell/shell.component";
import { ToDosComponent } from "./components/todos/todos.component";
import { AuthGuard } from "./utilities/AuthGuard";



export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'index.html', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'app', component: ShellComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'todos', component: ToDosComponent },
            { path: 'about', loadChildren: './components/+about/about.module#AboutModule' }

        ]
    },
    { path: '**', redirectTo: 'error' }
    // example of lazy loaded module

];
