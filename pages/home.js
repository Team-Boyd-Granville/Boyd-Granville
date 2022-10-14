/* eslint-disable react/jsx-key */
// import { Card, Button, CardTitle, CardText } from 'reactstrap';
import Layout from "../components/Layout"
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

import { getUsersRepos, getUsersStarred, getRecommendedRepos, getUserInfo } from './api/apiService';

function Home() {
    const { data: session, status } = useSession();
    const [starred, setStarred] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [repos, setRepos] = useState([]);
    const [userInfo, setUserInfo] = useState({})
    
    
    useEffect(() => {
      const getUserDetails = () => {
            getUserInfo(session.user.name)
                .then(resp => {
                  console.log(resp);
                  setUserInfo(resp);
              })
              .catch(error => {
                  alert("Error getting repos, see log");
                  console.log(error);
              });
      };
      const getStarred = () => {
          getUsersStarred(session.user.name)
              .then(resp => {
                  console.log(resp);
                  setStarred(resp);
              })
              .catch(error => {
                  alert("Error getting starred repos, see log");
                  console.log(error);
              });
      };
      const getRecommended = () => {
        getRecommendedRepos(session.user.name, pageNumber)
            .then(resp => {
                console.log(resp);
                setRecommended(r => {
                return [...r, ...resp]
                });
            })
            .catch(error => {
                alert("Error getting recommended repos, see log");
                console.log(error);
            });
    };
      if (session !== undefined) {
            getUserDetails();
            getStarred();
            getRecommended();
      }
    }, [session, pageNumber]);

  if (session !== undefined) 
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
        <div className="container mb-2">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={session.user.image} />
          <Card.Body>
            <Card.Title>{session.user.name}</Card.Title>
            <Card.Text>
              Bio: {JSON.stringify(userInfo.bio)}
            </Card.Text>
            <Card.Text>
              Blog: {JSON.stringify(userInfo.blog)}
            </Card.Text>
            <Card.Text>
              Followers: <Link href={'/followers'}><a style={{ textDecoration: 'none' }}>{JSON.stringify(userInfo.followers)}</a></Link>
            </Card.Text>
            <Card.Text>
              Following: <Link href={'/following'}><a style={{ textDecoration: 'none' }}>{JSON.stringify(userInfo.following)}</a></Link>
            </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>
              Company: {JSON.stringify(userInfo.company)}
            </Card.Text>
            <Card.Text>
              Location: {JSON.stringify(userInfo.location)}
            </Card.Text>
            <Card.Text>
              Public Repos: <a href={'/home'} style={{ textDecoration: 'none' }}>{JSON.stringify(userInfo.public_repos)}</a>
            </Card.Text>
            <Card.Text>
              Public Gists: {JSON.stringify(userInfo.public_gists)}
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        </div>
        <div className="col-5">
        
        <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-secondary" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">What we found based on your interests:</h5>
                </div>
                {/* <small>There are 3 public repositories you might be interested in</small> */}
              </a>

    <div style={{overflow: "scroll", height : "400px"}}>
      {(typeof recommended === 'undefined') ? (
        <h1></h1>
        ) : (
          recommended.map((repodata) => (
            <Link href={'/' + repodata.split("~@")[0].split(",")[0].trim() + '*' + repodata.split("~@")[0].split(", ")[2]}>
            <a href="#" className="list-group-item list-group-item-action">
              <h5>{repodata.split("~@")[0].split(",")[0]}</h5>
                <div className="d-flex w-100 justify-content-between">
                  {/* <h5 className="mb-1">{repodata.split("~@")[0].split(",")[0].trim()}</h5> */}
                  
                </div>
                <small className="text-muted">Based on your interests in: {repodata.split("~@")[1]}</small>
              </a>
          </Link>
          ))
          )}
          <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
          <a style={{position : "relative", display : "block", left : "40%", width : "200px"}} onClick={()=>{setPageNumber(pageNumber + 1)}}>View more</a>
                </div>
              </a>
    </div>

              {/* <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 2</h5>
                  <small className="text-muted">4 days ago</small>
                </div>
                <p className="mb-1">This topic is about ... </p>
                <small className="text-muted">because you starred xyz</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 3</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">This topic is about ... </p>
                <small className="text-muted">because you starred xyz</small>
              </a> */}
            </div>
          </div>
    
          {/* <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-light" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Trending repositories:</h5>
                </div>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 1</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">This topic is about ... </p>
                <small className="text-muted">-user-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 2</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">This topic is about ... </p>
                <small className="text-muted">-user-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 3</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">This topic is about ... </p>
                <small className="text-muted">-user-</small>
              </a>
            </div>
          </div> */}

          <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-warning" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Starred Projects:</h5>
                </div>
              </a>
      
      {(typeof starred === 'undefined') ? (
          <h1></h1>
      ) : (
        starred.map((starredRepo) => (
          <Link href={'/' + starredRepo.split(",")[0].trim() + '*' + starredRepo.split(",")[2].replace(".", "").trim()}>
          <a className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{starredRepo.split(",")[0].trim()}</h5>
            </div>
          </a>
          </Link>
        ))
        )}
              {/* <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 1</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">latest update </p>
                <small className="text-muted">-user-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 2</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">latest update </p>
                <small className="text-muted">-user-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 3</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">latest update </p>
                <small className="text-muted">-user-</small>
              </a> */}
            </div>
          </div>
{/*     
          <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-warning" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Starred Topics:</h5>
                </div>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 1</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">latest update </p>
                <small className="text-muted">-user-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 2</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">latest update </p>
                <small className="text-muted">-user-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Repository 3</h5>
                  <small className="text-muted">5 days ago</small>
                </div>
                <p className="mb-1">latest update </p>
                <small className="text-muted">-user-</small>
              </a>
            </div>
          </div> */}
    
        </div>
    
        {/* <div className="col-4">
        <div className="container mb-5">
            <div className="list-group">
              <a className="list-group-item list-group-item-action active list-group-item-primary" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-1">Featured Team Projects</h6>
                </div>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Project 1</h5>
                </div>
                <p className="mb-1">This topic is about ...</p>
                <small className="text-muted">-team members-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Project 2</h5>
                </div>
                <p className="mb-1">This topic is about ...</p>
                <small className="text-muted">-team members-</small>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Project 3</h5>
                </div>
                <p className="mb-1">This topic is about ...</p>
                <small className="text-muted">-team members-</small>
              </a>
            </div>
          </div>
  
    
        </div> */}
        
      </div>
    </div>
    
        
    
      )
}

Home.getLayout = function getLayout(Home) {
  return (
      <Layout>{Home}</Layout>
  )
}

export default Home