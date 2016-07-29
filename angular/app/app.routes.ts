import { provideRouter, RouterConfig }  from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {MainComponent} from "./main.component";
import {DashboardCourseComponent} from "./dashboards/dashboard-course.component";

const routes: RouterConfig = [
    {
        path: '',
        component: MainComponent
    },

    {
        path: 'users',
        component: UsersComponent
    },

    {
        path: 'coursedashboard',
        component: DashboardCourseComponent
    }
];

export const appRouterProviders = [
    provideRouter(routes)
];