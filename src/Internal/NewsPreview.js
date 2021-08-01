import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'

export default function NewsPreview(props) {
    return <Col style={{width: '100%', flexGrow: '1', flexBasis: '0'}}>
              <Card className='shadow-sm' style={{width: '100%', display: 'block'}}>
                <Card.Img src="https://rswerner.com/upload/36526a0db52570471b807c894cdc89fb1592723338572.jpeg" style={{maxHeight: '200px', objectFit: 'cover'}}></Card.Img>
                <Card.Body>
                  <Card.Title>Lorem Ipsum</Card.Title>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed scelerisque erat. Aenean a velit placerat, ultricies turpis et, fringilla sem. Vestibulum sit amet pretium justo. Nam ac feugiat enim, sed blandit nisi. Vestibulum fringilla, lorem eu pellentesque lacinia, metus odio rhoncus dolor, ac ornare leo sem lobortis dui. Suspendisse urna tortor, pharetra quis faucibus at, convallis lacinia dui. Cras faucibus, tellus et malesuada varius, mauris ipsum finibus lacus, et finibus est libero at nibh. Fusce consectetur eleifend vulputate. Aenean eget posuere odio.

</p>
<Button variant='dark'>Read More</Button>
                </Card.Body>
              </Card>
              </Col>
}