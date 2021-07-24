import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './Landing/LandingPage';

    ReactDOM.render(
        <div>
        <Router>
            <Switch>
                <Route path='/' exact>
                    <LandingPage></LandingPage>
                </Route>
                <Route path='/internal'>
                    <p>this is the internal home page</p>
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