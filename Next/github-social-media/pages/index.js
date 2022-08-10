import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

export default function Home() {

  return (
    <div>
        <div>
          <h1 className="text-center">Explore</h1>
        </div>

    <div>
        <Card body className="text-center">
            <CardTitle>Username</CardTitle>
            <div class="container">
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
