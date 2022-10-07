import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">GitHub Explore</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto navbar">
            <Nav.Link href="#Topics">Topics</Nav.Link>
            <Nav.Link href="#Trending">Trending</Nav.Link>
            <Nav.Link href="#Collection">Collection</Nav.Link>
            <Nav.Link href="#Events">Events</Nav.Link>
            <Nav.Link href="#Sponsers">GitHub Sponsers</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default ColorSchemesExample;