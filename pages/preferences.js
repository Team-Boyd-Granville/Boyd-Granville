import React from 'react'
import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function preferences() {
  return (
    <div>
      <Container>
        <Row>
        <Col>Select all topics that you are interested in seeing on your GitHub Explore feed:
        </Col>
        </Row>
        <Row>
          <Col><Button as="input" type="button" value="python" />{' '}</Col>
          <Col><Button as="input" type="button" value="java" />{' '}</Col>
          <Col><Button as="input" type="button" value="c" />{' '}</Col>
          <Col><Button as="input" type="button" value="machine-learning" />{' '}</Col>
          <Col><Button as="input" type="button" value="python3" />{' '}</Col>
          <Col><Button as="input" type="button" value="natural-language" />{' '}</Col>
          <Col><Button as="input" type="button" value="javascript" />{' '}</Col>
          <Col><Button as="input" type="button" value="npm-package" />{' '}</Col>
          <Col><Button as="input" type="button" value="npm-package" />{' '}</Col>
          <Col><Button as="input" type="button" value="npm-package" />{' '}</Col>
          <Col><Button as="input" type="button" value="vue" />{' '}</Col>
          <Col><Button as="input" type="button" value="react" />{' '}</Col>
          <Col><Button as="input" type="button" value="bootstrap" />{' '}</Col>
          <Col> <Button as="input" type="button" value="css" />{' '}</Col>
          <Col><Button as="input" type="button" value="html" />{' '}</Col>
          <Col><Button as="input" type="button" value="api" />{' '}</Col>
          <Col><Button as="input" type="button" value="php" />{' '}</Col>
          <Col><Button as="input" type="button" value="flask" />{' '}</Col>
          <Col><Button as="input" type="button" value="json" />{' '}</Col>
          <Col><Button as="input" type="button" value="webkit" />{' '}</Col>
          <Col><Button as="input" type="button" value="angular" />{' '}</Col>
          <Col><Button as="input" type="button" value="android" />{' '}</Col>
          <Col><Button as="input" type="button" value="database" />{' '}</Col>
          <Col><Button as="input" type="button" value="kubernetes" />{' '}</Col>
          <Col><Button as="input" type="button" value="r" />{' '}</Col>
          <Col><Button as="input" type="button" value="sql" />{' '}</Col>
          <Col><Button as="input" type="button" value="docker" />{' '}</Col>
          <Col><Button as="input" type="button" value="c++" />{' '}</Col>
          <Col><Button as="input" type="button" value="azure" />{' '}</Col>
          <Col><Button as="input" type="button" value="microsoft" />{' '}</Col>
          <Col><Button as="input" type="button" value="amazon" />{' '}</Col>
          <Col><Button as="input" type="button" value="raspberry-pi" />{' '}</Col>
          <Col><Button as="input" type="button" value="angular" />{' '}</Col>
          <Col><Button as="input" type="button" value="bitcoin" />{' '}</Col>
          <Col><Button as="input" type="button" value="django" />{' '}</Col>
          <Col><Button as="input" type="button" value="frontend" />{' '}</Col>
          <Col><Button as="input" type="button" value="eslint" />{' '}</Col>
          <Col><Button as="input" type="button" value="firefox" />{' '}</Col>
          <Col><Button as="input" type="button" value="chrome" />{' '}</Col>
          <Col><Button as="input" type="button" value="google" />{' '}</Col>
          <Col><Button as="input" type="button" value="gulp" />{' '}</Col>
          <Col><Button as="input" type="button" value="ios" />{' '}</Col>
          <Col><Button as="input" type="button" value="laravel" />{' '}</Col>
          <Col><Button as="input" type="button" value="latex" />{' '}</Col>
          <Col><Button as="input" type="button" value="matlab" />{' '}</Col>
          <Col><Button as="input" type="button" value="nodejs" />{' '}</Col>
          <Col><Button as="input" type="button" value="rest-api" />{' '}</Col>
          <Col><Button as="input" type="button" value="springboot" />{' '}</Col>
          <Col><Button as="input" type="button" value="terminal" />{' '}</Col>
          <Col><Button as="input" type="button" value="maven" />{' '}</Col>
          <Col><Button as="input" type="button" value="twitter" />{' '}</Col>
          <Col><Button as="input" type="button" value="mongodb" />{' '}</Col>
          <Col><Button as="input" type="button" value="nosql" />{' '}</Col>
          <Col></Col>
         </Row>
         <Row>
        <Col><Button variant="outline-success">Submit</Button></Col>
        </Row>
        </Container>
    </div>
  )
}


preferences.getLayout = function getLayout(preferences) {
    return (
        <Layout>{preferences}</Layout>
    )
}

export default preferences
