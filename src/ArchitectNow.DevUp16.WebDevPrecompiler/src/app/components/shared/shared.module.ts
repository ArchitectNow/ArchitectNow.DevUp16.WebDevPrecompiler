import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SidebarToggleComponent } from "./sidebar/sidebar-toggle.component";
import { CommonModule } from "@angular/common";
import { Ng2BootstrapModule } from "ng2-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        ReactiveFormsModule,
        Ng2BootstrapModule,
    ],
    declarations: [
        SidebarComponent,
        SidebarToggleComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarComponent,
        SidebarToggleComponent
    ]
})
export class SharedModule {

}