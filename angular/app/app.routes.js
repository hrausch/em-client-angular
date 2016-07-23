"use strict";
var router_1 = require('@angular/router');
var users_component_1 = require("./users/users.component");
var main_component_1 = require("./main.component");
var routes = [
    {
        path: '',
        component: main_component_1.MainComponent
    },
    {
        path: 'users',
        component: users_component_1.UsersComponent
    }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map