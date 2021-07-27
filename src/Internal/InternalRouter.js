import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, useRouteMatch } from 'react-router-dom';
import Sidebar from './Sidebar';
import User from './User';


export default function InternalRouter(props) {

    let {path, url} = useRouteMatch();

    return <div>
        <Container fluid>
            <Row>
                <Col lg='1' className='bg-dark' style={{minHeight: '100vh', minWidth: '175px'}}>
                    <Sidebar />
                </Col>
                <Col lg='11'>
                <Switch>
            <Route path={`${path}/`} exact>
                <p>Welcome Home</p>
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