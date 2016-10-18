import { AppComponent } from "./app.component";
import { HTTP_PROVIDERS } from "@angular/http";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { APP_ROUTER_PROVIDERS, APP_BASE_PROVIDERS } from "./routes";
import { provideForms } from "@angular/forms";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    APP_BASE_PROVIDERS,
    provideForms()
]).catch((err: any) => console.error(err));
