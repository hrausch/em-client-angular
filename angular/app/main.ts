import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';
import {DashboardCourseService} from "./dashboards/dashboard-course.service";

bootstrap(AppComponent, [
    appRouterProviders,
    HTTP_PROVIDERS,
    DashboardCourseService
]);
