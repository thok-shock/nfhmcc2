import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Card, Table, Button, Modal } from 'react-bootstrap'

export default function Subscription(props) {

    const [user, updateUser] = useState([])
    const [showSubModal, updateShowSubModal] = useState(false)
    
    useEffect(() => {
        fetch('/api/user?type=self')
        .then(res => {
            return res.json()
        })
        .then(res => {
            updateUser(res.passport.user)
        })
    }, [])

    useEffect(() => {
        if (user && !user.subscriptionID) {
            updateShowSubModal(true)
        }
    }, [user])

    return <div><Container>
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
    <Modal show={showSubModal}>
        <Modal.Header>
            <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>We're happy that you are considering a NFHMCC subscription! To continue, please select the type of subscription you would like.</p>
            <div className='d-flex flex-column'>
                <div className='my-3'>
                    <h4>Regular Subscription</h4>
                    <p className='text-muted'>$5.00/month</p>
                    <p>The regular subscription is our standard tier, which includes all of the tea and coffee products you could ever want.</p>

            <Button className='w-100'>Regular</Button>
            </div>
            <div className='my-3'>
            <h4>Premium Subscription</h4>
            <p className='text-muted'>$10.00/month</p>
                    <p>The premium sandwich includes everything from our regular subscription, but includes frozen food options as well.</p>
            <Button className='w-100'>Premium</Button>
            </div>
            </div>
        </Modal.Body>
    </Modal>
    </div>
}