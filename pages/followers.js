/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import Commit from '../components/Commit';
import Issue from '../components/Issue';
import Layout from "../components/Layout"
import { getFollowers } from './api/apiService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


function Followers() {
  const [followers, setFollowers] = useState([{}]);
  const getAllFollowers = () => {
    getFollowers("mtytel")
    .then(resp => {
      console.log(resp);
      setFollowers(resp);
        })
        .catch(error => {
            alert("Error getting starred repos, see log");
            console.log(error);
          });
        };

useEffect(() => {
  getAllFollowers();
    }, []);

  return (
    <div>
      {(typeof followers === 'undefined') ? (
        <h1></h1>
        ) : (
          followers.map((follower) => (
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{follower.login}</h5>
                  
                  {/* <small className="text-muted">3 days ago</small> */}
                </div>
                {/* <p className="mb-1">This topic is about ...</p> */}
                {/* <small className="text-muted">because you follow xyz</small> */}
              </a>
          // </Link>
          ))
          )}
    </div>
  )
}

Followers.getLayout = function getLayout(Followers) {
  return (
      <Layout>{Followers}</Layout>
  )
}


export default Followers