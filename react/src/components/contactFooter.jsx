import React from "react";
import Form from "react-bootstrap/Form";
import Instagram from "../images/Instagram.png";
import facebook from "../images/facebook.png";
import twitter from "../images/twitter.png";


const ContactFooter = () => {


  return (
    <div className="d-flex flex-row justify-content-around">
      <div style={{ width: "30vw" }}>
        <h2
          style={{ color: "white", textAlign: "center", marginBottom: "4vh" }}
        >
          Follow Us
        </h2>
        <div className="d-flex flex-row justify-content-around">
          <a href="https://www.facebook.com/DevolverDigital/">
            <img src={facebook} style={{ width: "5vw", height: "10vh" }} />
          </a>
          <a href="https://twitter.com/devolverdigital">
            <img src={twitter} style={{ width: "5vw", height: "10vh" }} />
          </a>
          <a href="https://www.instagram.com/devolverdigital/">
            <img
              src={Instagram}
              style={{ width: "5vw", height: "8vh" }}
              className="mb-2"
            />
          </a>
        </div>
      </div>
      <Form style={{ width: "30vw" }}>
        <h2
          style={{ color: "white", textAlign: "center" }}
        >
          Contact Us
        </h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  )

}

export default ContactFooter;