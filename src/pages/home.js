import React, { Component } from "react";
import { Nav, Navbar, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

function Home() {
  return (
    <div className="Home">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand
          href="/"
          style={{ fontSize: "40px", fontFamily: "sans-serif" }}
        >
          Certificate Verification
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/upload">Upload</Nav.Link>
          <Nav.Link href="/test">Test</Nav.Link>
        </Nav>
      </Navbar>
      <Card
          style={{
            width: "30rem",
            marginTop: "50px",
            marginLeft: "420px",
            marginBottom: "30px",
            borderWidth: "5px"
          }}
          bg={"light"}
          border="secondary"
          
        >
          <Card.Body style={{ fontSize: "30px" }}>
            <p>Would you like to upload a certificate onto the blockchain? </p>
            <Button variant="primary" href="/upload">Click here!</Button>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "30rem",
            marginTop: "30px",
            marginLeft: "420px",
            marginBottom: "30px",
            borderWidth: "5px"
          }}
          bg={"light"}
          border="secondary"
        >
          <Card.Body style={{ fontSize: "30px" }}>
            <p>Would you like to verify a certificate on the blockchain? </p>
            <Button variant="primary" href="/test">Click here!</Button>
          </Card.Body>
        </Card>
      
    
    </div>
  );
}

export default Home;
