import React from "react";
import Form from "react-bootstrap/Form";
import logo from "./logo.png";
import { Row, InputGroup, Button } from "reactstrap";
import Container from '@mui/material/Container';
import Slider from "react-slick";
import axios from 'axios';
import {Link} from "react-router-dom"
import { rootShouldForwardProp } from "@mui/material/styles/styled";


export default class Landing extends React.Component{
  constructor(props) {
      super();
      this.state = {
      };
  };
  /******************************************** LIFECYCLE *************************************************/
async componentDidMount() {
  this._isMounted = true;
}

componentWillUnmount() {
  this._isMounted = false;
}


  /******************************************** RENDER ***************************************************/
  render() {
    return (
      <Container maxWidth="md">
        <div style={{ fontFamily: 'Kanit' }}>
          <div style={{ marginTop: "10vh" }}>
            <img src={logo} style={{width:"50vh", height:"40vh" }}/>
          </div>
          <div>
              <Link to={"/login"}>
              <Button  style={{ color: "#7A1ED6", background:"#FFCF23", marginRight: '10px'}} id="button-addon2">
                Login
              </Button>
              </Link>
              <Link to={"/register"}>
              <Button style={{ color: "#7A1ED6", background:"#FFCF23", marginRight: '10px'}} id="button-addon2">
                Register
              </Button>
              </Link>
              </div>
      </div>
    </Container>
  );
}
};