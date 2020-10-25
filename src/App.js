import React, { Component } from "react";
import { Nav, Navbar, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import fs from "fs";
// import web3 from "./web3";
import student from "./student";

class App extends Component {
  state = {
    imageUploaded: null,
    hash: "",
    verified: null,
  };

  componentDidMount() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  };

  // async componentDidMount() {
  // const accounts = await web3.eth.getAccounts();
  // console.log(accounts[0]);
  // console.log(await student.methods.contractOwner().call());
  // }

  fileChangedHandler = (event) => {
    // let images = [];
    // for (let i = 0; i < event.target.files.length; i++) {
    // console.log(event.target.files[0]);
    //   images.push(event.target.files[i]);
    // }
    this.setState({ imageUploaded: event.target.files[0] });
  };

  postHandler = async () => {
    const hash = await student.methods.finddetails(1).call();
    // console.log(hash[0], this.state.imageUploaded);
    this.setState({ hash });
    // let count = [];
    let fd = new FormData();
    fd.append("image", this.state.imageUploaded);
    fd.append("Hash", hash);
    // console.log(fd);
    // for (let j = 0; j < this.state.imageUploaded.length; j++) {
    // console.log(j, this.state.imageUploaded[j]);
    // fd.append("image", this.state.imageUploaded[j]);
    // }

    fetch("http://localhost:8080/validate", {
      headers: {},
      method: "POST",
      body: fd,
    })
      .then((response) => {
        // console.log(response.status);
        if (response.status === 200) {
          this.setState({ verified: true });
          // alert("Blockchain-verified certificate!");
          // count++;
          // console.log(count);
        } else if (response.status === 400) {
          alert("Please upload an image!");
        } else if (response.status === 204) {
          this.setState({ verified: false });
          // alert("Certificate not verified!");
        }
      })
      .catch((err) => {
        // console.log(err);
        return Promise.reject();
      });
    // if (count !== 0) {
    //   alert("Thank you for uploading the certificate!");
    // }
  };

  render() {
    let card = "";
    if (this.state.verified) {
      card = (
        <Card
          style={{
            width: "18rem",
            marginTop: "50px",
            marginLeft: "480px",
            marginBottom: "50px",
          }}
          bg={"light"}
          border="success"
        >
          <Card.Body style={{  fontSize: "20px" }}>
            <h6> This certificate is verified in the blockchain. </h6> <br></br>
            <h6> Hash: {this.state.hash} </h6>
          </Card.Body>
        </Card>
      );
    } else if (this.state.verified == false) {
      card = (
        <Card
          style={{
            width: "18rem",
            marginTop: "50px",
            marginLeft: "480px",
            marginBottom: "50px",
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
      <div className="App">
        <Navbar bg="light" variant="light">
          <Navbar.Brand
            href="#home"
            style={{ fontSize: "40px", fontFamily: "sans-serif" }}
          >
            TheRollNumber
          </Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar>
        <h3 style={{ paddingTop: "70px" }}>
          Verify the two certificates below
        </h3>
        <h6 style={{ paddingBottom: "60px" }}>
          Download the certificates and test the service
        </h6>
        <a href={require("./files/valid.jpeg")} download="valid.jpeg">
          Click to download a sample valid certificate
        </a>{" "}
        <br></br>
        <a
          href={require("./files/manipulated.jpeg")}
          download="manipulated.jpeg"
        >
          Click to download a sample manipulated certificate
        </a>
        <p style={{ fontSize: "20px", paddingTop: "60px" }}>
          Please upload your certificate in a png or jpeg format:
        </p>
        <input
          type="file"
          id="image"
          onChange={this.fileChangedHandler}
        ></input>
        <Button variant="secondary" onClick={() => this.postHandler()}>
          Upload
        </Button>
        {card}
      </div>
    );
  }
}

export default App;
