import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  CardDeck,
  CardColumns,
  Alert
} from "react-bootstrap";
import NewsPreview from "./NewsPreview";

export default function Homepage(props) {
  return (
    <div>
      {/** 
      <Container fluid>
        <Row>
          <Col md="6" className='bg-white p-3'>
            <Card className='shadow-sm my-3'>
                <Card.Body>
                <Card.Title>
                    Welcome Back, Ryan
                </Card.Title>
                <p>The Nathan F Hahn Memorial Coffee Club is here to provide for all of your coffee related needs. If you have any questions or concerns about our website, please send us an email at coffeeclub@hd.wisc.edu</p>
                </Card.Body>
            </Card>
            <Card className='shadow-sm my-3'>
                <Card.Body>
                    <Card.Title>Membership</Card.Title>
                    <Card.Subtitle >Status: <span className='text-success'>Enrolled</span></Card.Subtitle>
                    <p>You are currently enrolled as a regular member of the Nathan F Hahn Memorial Coffee Club. Your last payment was made on <strong>July 21st, 2021</strong>, and will require renewal on August 21st, 2021</p>
                    <p>Automatic renewal is currently enabled on your account, <a href='/'>see more</a></p>
                    <Button variant='dark'>See More</Button>
                </Card.Body>
            </Card>
          </Col>
          <Col md="6" className='p-3'>
            
          </Col>
        </Row>
      </Container>
      */}
      <Container>
          <h3 className='my-3'>Home</h3>
          <Row>
              <Col>
              <Alert variant='danger'><i class="bi bi-x-circle"></i> Your account has been suspended due to invalid payment. <Alert.Link>Update your payment information</Alert.Link></Alert>
              <Alert variant='warning'><i class="bi bi-exclamation-triangle"></i> You are not enrolled in automatic payments. Enroll in automatic payments to ensure access. <Alert.Link>Update your payment information</Alert.Link></Alert>
              </Col>
          </Row>
        <Row>
          <Col>
            <Card className="shadow-sm my-3" >
              <Card.Body>
                <Card.Title>Welcome</Card.Title>
                <Row>
                    <Col>
                    <p className='text-muted'>Hello, Ryan!</p>
                    <p>
                  The Nathan F Hahn Memorial Coffee Club is here to provide for
                  all of your coffee related needs. If you have any questions or
                  concerns about our website, please send us an email at
                  coffeeclub@hd.wisc.edu
                </p>
                    </Col>
                    <Col>
                    <p className='text-muted'>Membership</p>
                    <p>
                  You are currently enrolled as a regular member of the Nathan F
                  Hahn Memorial Coffee Club. Your last payment was made on{" "}
                  <strong>July 21st, 2021</strong>, and will require renewal on
                  August 21st, 2021
                </p>
                <p>
                  Automatic renewal is currently enabled on your account,{" "}
                  <a href="/">see more</a>
                </p>
                <Button variant="dark">See More</Button>
                    </Col>
                </Row>
                
            
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
          <Card className='shadow-sm'>
              <Card.Body>
                  <Card.Title>News</Card.Title>
            <CardColumns style={{width: '100%'}}>
            <NewsPreview />
            <NewsPreview />
            <NewsPreview />
            <NewsPreview />
            </CardColumns>
            </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
