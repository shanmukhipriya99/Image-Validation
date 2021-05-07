import React, { Component } from "react";
import { Nav, Navbar, Button, Card, Form, Row } from "react-bootstrap";
// import { AiFillInfoCircle } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./test.css";
// import fs from "fs";
// import web3 from "./web3";
import student from "../student";
// import ReactFileReader from "react-file-reader";
// import multer from "multer";
import sha256 from "js-sha256";

class Test extends Component {
  state = {
    id: null,
    imageUploaded: null,
    Nhash: "",
    verified: null,
  };

  componentDidMount() {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  fileChangedHandler = async (event) => {
    this.setState({ imageUploaded: event.target.files[0] });
    const fr = new FileReader();
    fr.onload = () => {
      // console.log(fr.result);
      let file = fr.result.split(",")[1];
      // console.log(file.split(",")[1]);
      let hs = "0x" + sha256(file);
      // console.log(hs);
      this.setState({ Nhash: hs });
    };
    fr.readAsDataURL(event.target.files[0]);
    this.setState({ id: document.getElementById("Cid").value });
  };

  postHandler = async () => {
    if (this.state.imageUploaded === null) {
        alert("Please upload a certificate!");
        document.location.reload();
      } 
    const hash = await student.methods.finddetails(this.state.id).call();
          if (this.state.Nhash === hash[0]) {
        this.setState({ verified: true });
        // console.log("Nhash: ", this.state.Nhash, "H: ", hash);
        // alert("Success!");
      } else {
        this.setState({ verified: false });
        // console.log("Nhash: ", this.state.Nhash, "H: ", hash);
        // alert("Fail!");
      }
  };

  render() {
    let card = "";
    if (this.state.verified) {
      card = (
        <Card
          style={{
            width: "40rem",
            marginTop: "10px",
            marginLeft: "320px",
            // marginBottom: "50px",
          }}
          bg={"light"}
          border="success"
        >
          <Card.Body style={{ fontSize: "20px" }}>
            <h6>
              {" "}
              This certificate is verified in the blockchain.{" "}
            </h6>{" "}
            
            <h6> Hash: {this.state.Nhash} </h6>
          </Card.Body>
        </Card>
      );
    } else if (this.state.verified === false) {
      card = (
        <Card
          style={{
            width: "30rem",
            marginTop: "10px",
            marginLeft: "400px",
            // marginBottom: "50px",
          }}
          bg={"light"}
          border="danger"
        >
          <Card.Body style={{ fontSize: "20px" }}>
            <h6>This certificate is not verified in the blockchain.</h6>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div className="Test">
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
            width: "45rem",
            marginTop: "50px",
            marginLeft: "280px",
            marginBottom: "30px",
            borderWidth: "5px",
            padding: "15px",
          }}
          bg={"light"}
          border="secondary"
        >
          <Card.Body>
            <Card.Title>Verify the Certificate</Card.Title>
            <Card.Text>
            <Form>
            <Row>
              <Form.Group style={{ marginLeft: "220px", marginTop: "20px" }}>
                <Form.Control id="Cid" type="number" placeholder="Enter ID" />
                <Form.Text className="text-muted">Enter above 100</Form.Text>
              </Form.Group>
            </Row>
          </Form>
          <p style={{ fontSize: "20px", paddingTop: "20px" }}>
          Please upload your certificate in a png or jpeg format:
        </p>
        <input
          type="file"
          id="image"
          onChange={this.fileChangedHandler}
        ></input>
        <Button variant="primary" onClick={() => this.postHandler()}>
          Upload
        </Button>
            </Card.Text>
          </Card.Body>
        </Card>
        {card}
      </div>
    );
  }
}

export default Test;
