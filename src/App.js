import React from 'react'
import Header from "./Header";
import Home from './Home';
import Tracker from './Tracker';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
    return (
        
        <Router>
            <Header />
            <div className="app">
                <Switch>
                    <Route path="/login">  
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Tracker/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
