import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
const ROUTES = [
    {path: "/",
        exact: true,
        component: Login
    },
    {path: "/dashboard",
        allowed: ['admin'],
        exact: true,
        component: Dashboard
    },
    {path: "/register",
        allowed: ['admin'],
        exact: true,
        component: Register
    },
    {path: "/getUsers",
        allowed: ['admin'],
        exact: true,
        component: () => <h1>User Table</h1>
    },
    {path: "/welcome",
        allowed: ['users'],
        exact: true,
        component: () => <h1>Welcome Users</h1>
    },
    {
        component: () => <h1>Error 404</h1>,
    },
];
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes}/>}
        />
    );
}
export function RenderRoutes({routes}) {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route component={() => <h1>Not Found!</h1>}/>
        </Switch>
    );
}
export default ROUTES;
