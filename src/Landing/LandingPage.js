import React from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";

export default function LandingPage(props) {
  return (
    <div>
      <Container fluid>
        <Row height="100vh">
          <Col style={{ padding: "0px", height: "100vh" }}>
            <img
              src="/public/mug.jpg"
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                filter: "brightness(50%)",
                borderBottomRightRadius: "50% 5%",
                borderBottomLeftRadius: "50% 5%",
              }}
            ></img>
            <div
              className="d-flex"
              style={{
                position: "absolute",
                backgroundColor: "white",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "48%",
                minHeight: "200px",
                minWidth: "400px",
                opacity: "90%",
                borderRadius: "15px",
                margin: "40px",
              }}
            >
              <img src="/public/Hahn2.png" width="100%" className="py-4"></img>
            </div>
            <div
              className="d-flex "
              style={{
                position: "absolute",
                color: "white",
                top: "20px",
                width: "100%",
                height: "40px",
              }}
            >
              <p className="ml-auto mx-3" style={{ padding: ".375rem .75rem" }}>
                Membership Prices
              </p>
              <p className="mx-3" style={{ padding: ".375rem .75rem" }}>
                Current Inventory
              </p>
              <Button className="mx-3">Login / Register</Button>
            </div>
          </Col>
        </Row>
        <Row className='py-3'></Row>
        <Row className="text-center my-5">
          <Col className="d-flex flex-column">
            <h1>One Love</h1>
            <p className="m-auto" style={{ maxWidth: "80%" }}>
              The Nathan F. Hahn Memorial Coffee Club is an exclusive and
              premium provider of luxury caffeine beverages for our members.
              Since it's inception in 2019, we have brewed thousands of cups for
              hundreds of agents like you.
            </p>
          </Col>
        </Row>
        <Row className='py-3'>

        </Row>
        <Row className="my-5 text-center">
        <Col md="4">
              <Card className="mb-2 h-100 shadow-sm">
                <Card.Header>
                  <span className="h2">Free</span>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>
                    $0.00<span className="text-muted">/month</span>
                  </Card.Title>
                  <Card.Text>
                    You are welcome to use our kettle and mugs, at no cost.
                  </Card.Text>
                  <h5>Includes</h5>
                  <div className="d-flex flex-column justify-content-between">
                    <ul className="list-unstyled">
                      <li>Hot Water</li>
                      <li>Washable Ceramic Mugs</li>
                      <li>Friendship</li>
                      <li>Memes</li>
                    </ul>
                    <Button variant="outline-primary" size="lg">
                      More Information
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-2 h-100 shadow-sm">
                <Card.Header>
                  <span className="h2">Member</span>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>
                    $5.00<span className="text-muted">/month</span>
                  </Card.Title>
                  <Card.Text>
                    Coffee, Tea, Coffee Creamer, and so much more. If you can
                    drink it, it's in this plan.
                  </Card.Text>
                  <h5>Includes</h5>
                  <div className="d-flex flex-column justify-content-between">
                    <ul className="list-unstyled">
                      <li>Brewed Hot and Cold Coffee</li>
                      <li>Coffee Creamer (Liquid)</li>
                      <li>Orange Juice</li>
                      <li>Chocolate Milk</li>
                    </ul>
                    <Button href="/register" size="lg">
                      Get Started
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card className="mb-2 h-100 shadow-sm">
                <Card.Header>
                  <span className="h2">Premium</span>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>
                    $10.00<span className="text-muted">/month</span>
                  </Card.Title>
                  <Card.Text>
                    Gain access to our select frozen breakfasts, as well as all
                    normal member perks.
                  </Card.Text>
                  <h5>Includes</h5>
                  <div className="d-flex flex-column justify-content-between">
                    <ul className="list-unstyled">
                      <li>All Member Perks</li>
                      <li>Frozen Sandwiches</li>
                      <li>Special Thanks on Emails</li>
                      <li>Insider Access to NFHMCC Plans</li>
                    </ul>
                    <Button href="/register" size="lg">
                      Get Started
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        <Row>
            <Col className='py-3 bg-dark text-light text-center' md='12'>
            <h1 className=''>Videos</h1>
            </Col>
        </Row>
        <Row className='pb-5 bg-dark text-light text-center' style={{/*borderTopRightRadius: "5% 50%", borderTopLeftRadius: "5% 50%"*/}}>
        
              <Col md='6'>
                  <div className='m-4'>
                    <h3 className='my-5'>How to Brew Coffee</h3>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/tb2mPg1qHis" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                  
              </Col>
              <Col md='6' className='d-flex'>
              <div className='m-auto'>
                  <h3 className='my-5'>Our Music</h3>
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/BHS0482sc0E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
              </Col>
        </Row>
        <Row className='p-2' style={{backgroundColor: 'black', color: 'lightgray'}}>
            <Col md='12' className='text-center'>
                <p className='m-1'>Website designed by Ryan S Werner</p>
                <p className='m-1'>© 2021 NFHMCC</p>
            </Col>
        </Row>
      </Container>
    </div>
  );
}
