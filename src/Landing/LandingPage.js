import React from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'

export default function LandingPage(props) {

    return <div>
        <Container fluid>
            <Row height='100vh'>
                <Col style={{padding: '0px', height: '100vh'}}>
                <img src='/public/mug.jpg' width='100%' height='100%' style={{objectFit: 'cover', filter: 'brightness(50%)', borderBottomRightRadius: '50% 5%', borderBottomLeftRadius: '50% 5%'}}></img>
                <div className='d-flex' style={{position: 'absolute', backgroundColor: 'white', transform: 'translate(-50%, -50%)', top: '50%', left: '48%', minHeight: '200px', minWidth: '400px', opacity: '90%', borderRadius: '15px', margin: '40px'}}>  
                    <img src='/public/Hahn2.png' width='100%' className='py-4'></img>   
                </div>
                <div className='d-flex ' style={{position: 'absolute', color: 'white', top: '20px', width: '100%', height: '40px'}}>
                    <p className='ml-auto mx-3' style={{padding: '.375rem .75rem'}}>Membership Prices</p>
                    <p className='mx-3' style={{padding: '.375rem .75rem'}}>Current Inventory</p>
                    <Button className='mx-3'>Login / Register</Button>
                </div>
                </Col>
            </Row>
            <Row>
                <h3>One Love</h3>
                <Col>
                <Card>
                    test
                </Card>
                </Col>
                <Col>
                <Card></Card>
                </Col>
                <Col>
                </Col>
            </Row>
            
        </Container>
    </div>
}