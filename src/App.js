import React, { createContext, useReducer, useEffect, useContext } from "react";
import NavBar from "./components/Common/NavBar";
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";

import NotFound from "./components/Common/NotFound";
import routes from "./Router";

export const UserContext = createContext();

const Routing = () => {
    const history = useHistory();
    const location = useLocation();
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "USER", payload: user });
        } else {
            if (!history.location.pathname.startsWith("/reset")) history.push("/signin");
        }
    }, []);

    useEffect(() => {
        let pathname = location?.pathname;
        if (state) {
            if (pathname === "/reset" || pathname === "/signin" || pathname === "/signup") {
                history.push("/");
            }
        }
    }, [state, location]);

    return (
        <Switch>
            {routes.map((route, index) => {
                let Component = route.component;
                return (
                    <Route key={index} path={route.path} exact={route.exactly}>
                        {route.isnavbar && <NavBar />}
                        <div className="wrapper-container">
                            <Component />
                        </div>
                    </Route>
                );
            })}
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
