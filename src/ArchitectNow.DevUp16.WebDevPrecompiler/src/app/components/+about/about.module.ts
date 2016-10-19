import { NgModule } from "@angular/core/src/metadata/ng_module";
import { RouterModule } from "@angular/router";
import { ABOUT_ROUTES } from "./about.routes";
import { AboutComponent } from "./about.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        RouterModule.forChild(ABOUT_ROUTES),
        SharedModule,
    ],
    declarations: [
        AboutComponent,
    ],
})
export class AboutModule {
}