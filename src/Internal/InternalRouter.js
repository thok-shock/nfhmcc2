import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, useRouteMatch } from 'react-router-dom';
import Homepage from './Homepage';
import Sidebar from './Sidebar';
import User from './User';


export default function InternalRouter(props) {

    let {path, url} = useRouteMatch();

    return <div>
        <Container fluid style={{minHeight: '100vh'}}>
            <Row className='d-flex flex-row'>
                <Col md='2' className='bg-dark' style={{minHeight: '100vh'}}>
                    <Sidebar />
                </Col>
                <Col md='10'>
                <Switch>
            <Route path={`${path}/`} exact>
                <Homepage></Homepage>
            </Route>
            <Route path={`${path}/u`} exact>
                <p>A list of users will appear here</p>
            </Route>
            <Route path={`${path}/u/:user`}>
                <User />
            </Route>
        </Switch>
                </Col>
            </Row>
        </Container>
        
    </div>
}