import React from 'react'
import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { postUser } from './api/apiService';
import { useSession } from 'next-auth/react'


function Preferences() {
  const { data: session, status } = useSession();

  var listTopics = new Array();

  const handleChangeTopics = event => {
    listTopics.push(event.target.value);
    console.log(listTopics);
  };

  const setUserTopics = () => {
    postUser(session.user.name, session.user.email, listTopics)
      .then(resp => {
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });

      window.location.href = '/home';
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>Select all topics that you are interested in seeing on your GitHub Explore feed:
          </Col>
        </Row>
        <Row>
          <Col><Button as="input" type="button" value="python" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="java" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="c" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="machine-learning" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="python3" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="natural-language" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="javascript" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="npm-package" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="npm-package" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="npm-package" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="vue" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="react" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="bootstrap" onClick={handleChangeTopics} />{' '}</Col>
          <Col> <Button as="input" type="button" value="css" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="html" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="api" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="php" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="flask" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="json" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="webkit" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="angular" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="android" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="database" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="kubernetes" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="r" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="sql" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="docker" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="c++" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="azure" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="microsoft" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="amazon" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="raspberry-pi" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="angular" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="bitcoin" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="django" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="frontend" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="eslint" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="firefox" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="chrome" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="google" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="gulp" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="ios" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="laravel" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="latex" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="matlab" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="nodejs" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="rest-api" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="springboot" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="terminal" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="maven" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="twitter" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="mongodb" onClick={handleChangeTopics} />{' '}</Col>
          <Col><Button as="input" type="button" value="nosql" onClick={handleChangeTopics} />{' '}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col><Button variant="outline-success" onClick={setUserTopics}>Submit</Button></Col>
        </Row>
      </Container>
    </div>
  )
}


Preferences.getLayout = function getLayout(Preferences) {
  return (
    <Layout>{Preferences}</Layout>
  )
}

export default preferences