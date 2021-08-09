import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";





export default function SubscriptionModal(props) {

const [clientSecret, updateClientSecret] = useState(null)
const elements = useElements()
const stripe = useStripe()

useEffect(() => {
  if (props.modalStage == 'payment') {
    fetch('/api/stripe/get-latest-secret')
    .then(res => {
      return res.json()
    })
    .then(res => {
      updateClientSecret(res.client_secret)
    })
    .catch(err => {
      console.log(err)
    })
  }
}, [props.modalStage])

function subscribe(price) {
  props.subscribe(price)
}

function confirmPayment(clientSecret, cardElement, fname, lname) {
  return new Promise((resolve, reject) => {
    stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: fname + ' ' + lname,
        },
      }
    })
  })
}

  if (props.modalStage == "subscription") {
    return (
      <Modal show={props.showSubModal}>
        <Modal.Header>
          <Modal.Title>Welcome</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            We're happy that you are considering a NFHMCC subscription! To
            continue, please select the type of subscription you would like.
          </p>
          <hr></hr>
          <div className="d-flex flex-column">
            <div className="my-3">
              <h4>Regular Subscription</h4>
              <p className="text-muted">$5.00/month</p>
              <p>
                The regular subscription is our standard tier, which includes
                all of the tea and coffee products you could ever want.
              </p>
              <ul>
                <li>Unlimited Coffee</li>
                <ul>
                  <li>Mild</li>
                  <li>Bold (Available on Request)</li>
                </ul>
                <li>Coffee Creamer</li>
                <ul>
                  <li>Half/Half</li>
                  <li>French Vanilla</li>
                </ul>
                <li>Chai Latte</li>
                <li>Tea</li>
                <li>Milk</li>
              </ul>

              <Button
                className="w-100"
                onClick={() => {
                  subscribe("price_1JMIY6EXx3VJ7sWlmoTuZOi3");
                }}
              >
                Regular
              </Button>
            </div>
            <div>
              <hr></hr>
            </div>
            <div className="my-3">
              <h4>Premium Subscription</h4>
              <p className="text-muted">$10.00/month</p>
              <p>
                The premium sandwich includes everything from our regular
                subscription, but includes frozen food options as well.
              </p>
              <p className="text-danger">
                This subscription is not yet available.
              </p>
              <Button disabled className="w-100">
                Premium
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <Modal show={props.showSubModal}>
        <Modal.Header>
          <Modal.Title>Complete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Thank you for joining the Nathan F Hahn Memorial Coffee Club. To
            finish your subscription, please provide payment details.
          </p>

          <Form.Row className="m-1">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="fname"></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lname"></Form.Control>
            </Form.Group>
          </Form.Row>

          <div
            className="p-2 m-2"
            style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
          >
            <CardElement></CardElement>
          </div>
          <div className="d-flex flex-column justify-content-between mt-5">
            <div style={{ height: "200px", overflow: "auto", border: '1px solid #ced4da', borderRadius: ".25rem" }} className='p-1'>
              <small>
                <p>
                  The Nathan F Hahn Memorial Coffee Club (NFHMCC) has set
                  forward a Terms and Conditions of Use (Privacy Policy) in
                  order to protect the information of our users. If you disagree
                  with this policy, you may not use our website. The NFHMCC
                  collects minimal information about its members, including but
                  not limited to your name, personal preferences, email address,
                  and IP address. The NFHMCC does not store information about
                  member's credit cards on our servers. We promise to never
                  disclose or sell this information to anyone else, and keep the
                  information protected by using an encrypted database that can
                  only be accessed through a secure connection. If there is any
                  suspicion that information has been compromised in some way,
                  we will contact all member of the website to let them know. At
                  that time, we will also shut down our web services until the
                  vulnerability is located and fixed.
                </p>

                <p>
                  The NFHMCC does not directly process payments, and uses a
                  secure third party vendor, Stripe, to process transactions. We
                  are not responsible for any damages that are inflicted to you
                  by the use of our third-party vendors, but will let you know
                  if there is any reason for concern. Our third party vendors
                  may also collect additional information about members that we
                  are not aware of.
                </p>

                <p>
                  By using our site, you agree to not inflict damage by misuse.
                  You are liable for any damages that occur to the site as a
                  result of intentional harm or misuse.
                </p>

                <p>
                  The NFHMCC is not in any way related to the University of
                  Wisconsin - Madison or its affiliates. We are an independent
                  organization that compromises of members of the university,
                  but are not owned or operated by the university itself. 
                </p>

                <p>
                  The NFHMCC reserves the right to update its privacy policy and
                  will notify its members when there is an update. You are
                  encouraged to review the privacy policy often to stay informed
                  of any updates.
                </p>
              </small>
            </div>
            <p className="mx-auto mt-2">
              By paying, you agree to the above terms and conditions
            </p>
            <Button className="mx-auto px-5" variant="dark" onClick={() => {
              const cardElement = elements.getElement(CardElement)
              confirmPayment(props.user.paymentSecret, cardElement)
              }}>
              Pay $5.00
            </Button>
          </div>
          <div className="d-flex">
            <a className="mx-auto" href="https://stripe.com/" target="_blank">
              <img
                className="mx-auto mt-3"
                width="125px"
                src="https://cdn.brandfolder.io/KGT2DTA4/at/rvgw5pc69nhv9wkh7rw8ckv/Powered_by_Stripe_-_blurple.svg
"
              ></img>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
