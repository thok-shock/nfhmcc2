import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, useRouteMatch, Redirect } from 'react-router-dom';
import Homepage from './Homepage';
import Profile from './Profile';
import Sidebar from './Sidebar';
import Subscription from './Subscription';
import User from './User';


export default function InternalRouter(props) {

    const [status, updateStatus] = useState('loading')

    useEffect(() => {
        fetch('/api/user?type=self')
        .then(res => res.json())
        .then(res => {
            if (res.passport && res.passport.user) {
            updateStatus('loaded')
            } else {
                updateStatus('redirect')
            }
        })
    }, [])

    let {path, url} = useRouteMatch();

    if (status == 'loading') {
        return <Spinner animation='border'></Spinner>
    } else if (status == 'redirect') {
        window.location = '/login/google'
    } else if (status == 'loaded') {
    return <div>
        <span className='fixed-bottom m-3 text-muted'><small>© Ryan S Werner - v0.1</small></span>
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
            <Route path={`${path}/profile`} exact>
                <Profile></Profile>
            </Route>
            <Route path={`${path}/subscription`} exact>
                <Subscription></Subscription>
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
}