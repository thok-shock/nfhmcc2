import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './Landing/LandingPage';
import InternalRouter from './Internal/InternalRouter';

    ReactDOM.render(
        <div>
        <Router>
            <Switch>
                <Route path='/' exact>
                    <LandingPage></LandingPage>
                </Route>
                <Route path='/internal'>
                    <InternalRouter />
                </Route>
            </Switch>
        </Router>
        </div>
    ,
      document.getElementById('root')
    );
    
    if (module.hot) {
      module.hot.accept();
    }