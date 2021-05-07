import React, { Component } from "react";
import { Nav, Navbar, Form, Row, Button, Card } from "react-bootstrap";
import { AiFillInfoCircle } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./upload.css";
// import fs from "fs";
import web3 from "../web3";
import student from "../student";
// import ReactFileReader from "react-file-reader";
// import multer from "multer";
import sha256 from "js-sha256";

class Upload extends Component {
  state = {
    id: null,
    imageUploaded: null,
    Nhash: "",
    message: null
  };

  //   componentDidMount() {
  //     document.addEventListener("contextmenu", (e) => {
  //       e.preventDefault();
  //     });
  //   }

  fileChangedHandler = async (event) => {
    this.setState({ imageUploaded: event.target.files[0] });
    const fr = new FileReader();
    fr.onload = () => {
      // console.log(fr.result);
      let file = fr.result.split(",")[1];
      // console.log(file.split(",")[1]);
      let hs = "0x" + sha256(file);
      // console.log(hs);
      this.setState({ Nhash: hs.toString() });
    };
    fr.readAsDataURL(event.target.files[0]);
    this.setState({ id: document.getElementById("Cid").value });
  };

  postHandler = async () => {
    await window.ethereum.enable();
    //   console.log(this.state);
    if (this.state.imageUploaded === null) {
        alert("Please upload a certificate!");
        document.location.reload();
      } 
    this.setState({ message: "Uploading..."});
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    await student.methods.insertdetails(this.state.id, this.state.Nhash).send({
        from: accounts[0]
    });
    this.setState({ message: "Uploaded!"});
    // alert(this.state.message);
  };

  render() {
      let message;
      if(this.state.message !== null) {
        message = (<Card
            style={{
              width: "15rem",
              marginTop: "40px",
              marginLeft: "530px",
              // marginBottom: "50px",
            }}
            bg={"light"}
            border="success"
          >
            <Card.Body style={{ fontSize: "20px" }}>
              {this.state.message}
            </Card.Body>
          </Card>);
      }
    return (
      <div className="Upload">
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
            borderWidth: "5px",
            padding: "15px",
          }}
          bg={"light"}
          border="secondary"
        >
          <Card.Body>
            <Card.Title>Upload the Certificate</Card.Title>
            <Card.Text>
              <Form>
                <Row>
                  <Form.Group
                    style={{ marginLeft: "100px", marginTop: "20px" }}
                  >
                    <Form.Control
                      id="Cid"
                      type="number"
                      placeholder="Enter ID"
                    />
                    <Form.Text className="text-muted">
                      Enter above 100
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    style={{ marginLeft: "100px", marginTop: "20px" }}
                  >
                    <Form.File id="cert" onChange={this.fileChangedHandler} />
                  </Form.Group>
                </Row>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
        <Button variant="primary" onClick={() => this.postHandler()}>
          Upload...
        </Button>
        {message}
      </div>
    );
  }
}

export default Upload;
