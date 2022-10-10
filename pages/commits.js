import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import Layout from "../components/Layout"
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function commits() {
  return (
<div class="container">
  <div class="row">
    <div class="col-3">
    <div class="container mb-2">
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>username</Card.Title>
        <Card.Text>
          Number of Likes: #
        </Card.Text>
        <Card.Text>
          Number of Followers: #
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    </div>
    <div class="col-5">

            
      <div class="container mb-5">
        <div class="list-group">
          <a class="list-group-item list-group-item-action active list-group-item-danger" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">Documentation Updates</h6>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">update 1</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">update description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">update 2</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">commit description</p>
            <div><small class="text-muted">update name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">update 3</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">update description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">update 4</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">update description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">update 5</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">update description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
        </div>
      </div>
    
      <div class="container mb-5">
        <div class="list-group">
          <a class="list-group-item list-group-item-action active list-group-item-danger" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">Important Commit Summaries</h6>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">commit 1</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">commit description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">commit 2</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">commit description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">commit 3</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">commit description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">commit 4</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">commit description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">commit 5</h5>
              <small class="text-muted">4 days ago</small>
            </div>
            <p class="mb-1">commit description</p>
            <div><small class="text-muted">repository name</small></div>
            <small class="text-muted">submitted by "user"</small>
          </a>
        </div>
      </div>

    </div>
    <div class="col-4">
    <div class="container mb-5">
        <div class="list-group">
          <a class="list-group-item list-group-item-action active list-group-item-primary" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">Featured Team Projects</h6>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Project 1</h5>
            </div>
            <p class="mb-1">This topic is about ...</p>
            <small class="text-muted">-team members-</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Project 2</h5>
            </div>
            <p class="mb-1">This topic is about ...</p>
            <small class="text-muted">-team members-</small>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Project 3</h5>
            </div>
            <p class="mb-1">This topic is about ...</p>
            <small class="text-muted">-team members-</small>
          </a>
        </div>
      </div>

      <div class="container mb-5">
        <div class="list-group">
          <a class="list-group-item list-group-item-action active list-group-item-primary" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">Featured Team Members</h6>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Team Member 1</h5>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Team Member 2</h5>
            </div>
          </a>
          <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Team Member 3</h5>
            </div>
          </a>
        </div>
      </div>

    </div>
    
  </div>
</div>

    

  )
}

//function that calls the component
commits.getLayout = function getLayout(Test) {
  return (
      <Layout>{Test}</Layout>
  )
}

export default commits
