import { Card, Button, CardTitle, CardText } from 'reactstrap';
import Layout from "../components/Layout"
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react';

import { getUsersRepos, getUsersStarred } from './api/apiService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import InterfaceLayout from "../components/InterfaceLayout";

function Home() {
    const { data: session, status } = useSession();
    const [starred, setStarred] = useState([]);
    const [repos, setRepos] = useState([]);

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

    const getRepos = () => {
        getUsersRepos(session.user.name)
            .then(resp => {
                console.log(resp);
                setRepos(resp);
            })
            .catch(error => {
                alert("Error getting repos, see log");
                console.log(error);
            });
    };

    useEffect(() => {
        if (session !== undefined) {
            getStarred();
            getRepos();
        }
    });

  if (session !== undefined) 
  return (
    <div>
        <div>
          <h1> Welcome, {session.user.name}</h1>
          <h1 className="text-center">Explore</h1>
        </div>

    <div>
        <Card body className="text-center">
            <CardTitle>Username</CardTitle>
            <div className="container">
               <p><a href="#">Starred topics</a></p>
               <p><a href='#'>My repos: {repos}</a></p>
               <p><a href="#" className="pe-auto">Starred repositories: {starred}</a></p>
            </div>
        </Card>
    </div>

        <div>
            Here what we found based on your interests...
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
