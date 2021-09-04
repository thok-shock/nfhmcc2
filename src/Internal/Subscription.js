import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Card, Table, Button, Modal, Spinner } from 'react-bootstrap'
import SubscriptionModal from './SubscriptionModal'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

let stripePromise = loadStripe('pk_test_KLM6Q0w4hf9hz3orcAsdQL9L00ZbKbbhcB')

export default function Subscription(props) {

    
    const [user, updateUser] = useState([])
    const [showSubModal, updateShowSubModal] = useState(false)
    const [modalStage, updateModalStage] = useState('subscription')
    
    useEffect(() => {
        fetch('/api/user?type=self')
        .then(res => {
            return res.json()
        })
        .then(res => {
            //console.log(res.passport.user)
            updateUser(res.passport.user)
        })
    }, [])

    useEffect(() => {
        if (user && !user.subscriptionID) {
            updateShowSubModal(true)
        }
    }, [user])

    useEffect(() => {
        if (user) {
            if (user.subscriptionID) {
                updateModalStage('payment')
            }
        }
    })

    function subscribe(tier) {
        //console.log(user)
        fetch('/api/stripe/create-subscription', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'priceID': tier,
                'customerID': user.stripeID
            })
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            const newUser = JSON.parse(JSON.stringify(user))
            newUser.subscriptionID = res.subscriptionID
            newUser.paymentSecret = res.client_secret
            updateUser(newUser)
        })
    }

    if (user) {return <div><Elements stripe={stripePromise}><Container>
        <h3 className='my-3'>Subscription</h3>
        <Row>
            <Col>
            <Card className='shadow-sm'>
                <Card.Body>
                <Card.Title>
                    Overview
                </Card.Title>
                <p>Information about your current subscription period</p>
                <Table>
                    <tr>
                        <td>Status</td>
                        <td>Enrolled</td>
                    </tr>
                    <tr>
                        <td>Plan</td>
                        <td>Regular</td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td>07/31/2021</td>
                    </tr>
                </Table>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card className='shadow-sm'>
                <Card.Body>
                <Card.Title>
                    Payment Details
                </Card.Title>
                <p>Payment processing is through Stripe. No information is stored on NFHMCC servers</p>
                <Table>
                    <tr>
                        <td>Card</td>
                        <td>**** **** **** 4066</td>
                    </tr>
                    <tr>
                        <td>Exp</td>
                        <td>12/23</td>
                    </tr>
                    <tr>
                        <td>Next Billing Date</td>
                        <td>08/31/2021</td>
                    </tr>
                </Table>
                <Button variant='dark' className='mr-3'>Update Card</Button>
                <Button variant='outline-dark' className='mr-3'>Close Account</Button>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col>
            <Card className='shadow-sm'>
                <Card.Body>
                    <Card.Title>Subscription History</Card.Title>
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Event</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>07/31/2021</td>
                                <td>Membership Started</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
    <SubscriptionModal showSubModal={showSubModal} modalStage={modalStage} subscribe={subscribe} user={user}/>
    </Elements>
    </div>} else return <Spinner></Spinner>
}