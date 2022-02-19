import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import Maps from "./views/Maps";
import Test from "./views/test";
import Posts from "./views/Posts";

const ROUTES = [
    {path: "/",
        exact: true,
        component: Login
    },
    {path: "/dashboard",
        exact: true,
        component: Dashboard
    },
    {path: "/register",
        exact: true,
        component: Register
    },
    {path: "/maps",
        exact: true,
        component:Maps
    },
    {path: "/posts",
        exact: true,
        component:Posts
    },


    {path: "/test",
        exact: true,
        component:Test
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
