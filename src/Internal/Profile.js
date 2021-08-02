import React from 'react'
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap'

export default function Profile(props) {
    return <div>
        <Container>
            <h3 className='my-3'>Profile</h3>
            <Row>
                <Col>
                <Card className='shadow-sm'>
                    <Card.Body>
                        <Card.Title>Your Profile</Card.Title>
                        <p>Information about your profile will be visible to other members.</p>
                        <Row>
                            <Col lg='8'>
                                <p className='text-muted'>Personal Details</p>
                                <Table>
                                    <tr>
                                        <td>Name</td>
                                        <td>Ryan Werner</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>rswerner@wisc.edu</td>
                                    </tr>
                                    <tr>
                                        <td>Google ID</td>
                                        <td>102385581984089194569</td>
                                    </tr>
                                    <tr>
                                        <td>Join Date</td>
                                        <td>07/31/2021</td>
                                    </tr>
                                    <tr>
                                        <td>Biography</td>
                                        <td>Hi, my name is Ryan, and I like corgis! I think that they are very cute</td>
                                    </tr>
                                </Table>
                            </Col>
                            <Col lg='4'>
                            <p className='text-muted'>Profile Picture</p>
                                <div className='rect-img-container'>
                            <img style={{objectFit: 'cover'}} className='m-auto rect-img' src='https://intraburst.com/photos/RWER.jpg' ></img>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col>
                            <Button variant='dark' className='mx-2'>Update Profile</Button>
                            <Button variant='outline-dark' className='mx-2' disabled>Close Account</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    </div>
}