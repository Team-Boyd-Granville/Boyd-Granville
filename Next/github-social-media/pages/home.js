import React from 'react';
import { Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import Layout from "../components/Layout"
import { useSession } from 'next-auth/react'
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
// import InterfaceLayout from "../components/InterfaceLayout";

function Home() {
    const { data: session, status } = useSession()
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
               <p><a href="#" class="pe-auto">Starred repositories</a></p>
            </div>
        </Card>
    </div>

        <div>
            Here what we found based on your interests...
        </div>
    </div>

  )
}

//function that calls the component
Home.getLayout = function getLayout(Home) {
  return (
      <Layout>{Home}</Layout>
  )
}

export default Home