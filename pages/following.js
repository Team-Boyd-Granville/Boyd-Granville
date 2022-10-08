/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import Commit from '../components/Commit';
import Issue from '../components/Issue';
import Layout from "../components/Layout"
import { getFollowing } from './api/apiService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function Following() {
  const [following, setFollowing] = useState([{}]);
  const getAllFollowing = () => {
    getFollowing("mtytel")
    .then(resp => {
      console.log(resp);
      setFollowing(resp);
        })
        .catch(error => {
            alert("Error getting starred repos, see log");
            console.log(error);
          });
        };

useEffect(() => {
  getAllFollowing();
    }, []);

  return (
    <div>
      {(typeof following === 'undefined') ? (
        <h1></h1>
        ) : (
          following.map((follows) => (
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{follows.login}</h5>
                  
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

Following.getLayout = function getLayout(Following) {
  return (
      <Layout>{Following}</Layout>
  )
}

export default Following