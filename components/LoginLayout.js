import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image'
import React from 'react';
import MyImage from '../images/Octocat.jpg';

function LoginLayout({ children }) {
    return (
        <>
        {/* <Nav/> */}
        <div className="container">
            <main className="container">
                {children}
                <Image src={MyImage} className='img-fluid shadow-4' alt='...' />
            </main>
        </div>
        </>
    )
}

export default LoginLayout
