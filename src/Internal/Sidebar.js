
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SidebarLink from './SidebarLink'

export default function Sidebar(props) {
    return <Container fluid className='text-light text-left p-0' style={{margin: '0px !important'}}>
        <Row>
            <Col className='m-0'>
                <img src='/public/Hahn2-white.png' width='100%' className='my-2'></img>
                <hr style={{backgroundColor: 'white'}}></hr>
                <SidebarLink location='/internal'><i className="bi bi-house"></i> Home</SidebarLink>
                <hr style={{backgroundColor: 'white'}}></hr>
                <SidebarLink location='/internal/profile'><i className="bi bi-person"></i> Profile</SidebarLink>
                <SidebarLink location='/internal/subscription'><i className="bi bi-credit-card"></i> Subscription</SidebarLink>
                <hr style={{backgroundColor: 'white'}}></hr>
                <SidebarLink location='/internal/inventory'><i className="bi bi-file-earmark-bar-graph"></i> Inventory</SidebarLink>
            </Col>
        </Row>
    </Container>
}