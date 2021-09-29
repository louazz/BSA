import React from 'react'
import { render } from 'react-dom'
import Transaction from './components/transaction'
import App from './components/App';
import Client from './components/client'
import Gen from "./components/generate"
import Product from './components/product'

import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
            <Route path="/generate">
                    <Gen />
                </Route>
                <Route path="/client">
                    <Client />
                </Route>
                <Route path="/transaction">
                    <Transaction />
                </Route>
                <Route path="/product">
                    <Product/>
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>, document.getElementById('root'));