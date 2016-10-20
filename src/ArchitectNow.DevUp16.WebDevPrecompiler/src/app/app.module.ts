import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core/src/metadata/ng_module";
import { HomeComponent } from "./components/home/home.component";
import { APP_ROUTES } from "./app.routes";
import { SharedModule } from "./components/shared/shared.module";
import { SidebarService } from "./components/shared/sidebar/sidebar.service";
import { Store } from "./store/Store";
import { SecurityApiService } from "./api/Security.Api.Service";
import { TodoApiService } from "./api/Todo.Api.Service";
import { LoginComponent } from "./components/login/login.component";
import { ShellComponent } from "./components/shell/shell.component";
import { ToDosComponent } from "./components/todos/todos.component";
import { AuthGuard } from "./utilities/AuthGuard";
import { ToDoService } from "./services/ToDoService";
import { ToDoItemComponent } from "./components/todos/todoitem.component";



@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        ToDosComponent,
        ShellComponent,
        ToDoItemComponent

    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forRoot(APP_ROUTES)

    ],
    providers: [
        SidebarService,
        Store,
        TodoApiService,
        SecurityApiService,
        ToDoService,
        AuthGuard
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule {
}
