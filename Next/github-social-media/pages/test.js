import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';

function test() {
  return (
    <div>
      <div className="p-2 bg-light border">
        <Container class="container-fluid" >
          <ul class="list-group">
            <Row >
              <Col><li class="list-group-item">username</li></Col>
            </Row>
            <Row>
              <Col><li class="list-group-item">starred topics</li></Col>
            </Row>
            <Row>
              <Col><li class="list-group-item">starred repositories</li></Col>
            </Row>
          </ul>
        </Container>
      </div>
      <Container class="container-fluid">
        <Row>
        <Col sm={8}>
        <ul class="list-group">
           <li class="list-group-item">Based on topics you've starred</li>
           <li class="list-group-item">koopsmans-functionals</li>
           <li class="list-group-item">ase_koopsmans</li>
        </ul>
        </Col>
        <Col>
        <ul class="list-group">
        <li class="list-group-item">Trending repositories</li>
        <li class="list-group-item">Python</li>
        <li class="list-group-item">surrealdb</li>
        </ul>
        </Col>
        </Row>
    </Container>
    </div>
  )
}

export default test
