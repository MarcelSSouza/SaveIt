import React from "react";
import "react-bootstrap";
import { Container } from "react-bootstrap";
import logo from "./logo.png";
import {
  Row,
  InputGroup,
  Input,
  Button,
  Label
} from "reactstrap";
import "../App.css";
import {Link} from "react-router-dom"
import { useState, useEffect, createContext } from "react";
import axios from "axios";
export default class Login extends React.Component{
  constructor(props) {
      super();
      this.state = {
        email: "",
        pw: "",
      };
      
  };
  
/******************************************** LIFECYCLE *************************************************/
async componentDidMount() {
  this._isMounted = true;
}

componentWillUnmount() {
  this._isMounted = false;
}


/******************************************** HANDLERS *************************************************/
handleEmail = (e) => {
  let email = e.target.value;
  this.setState({email: email});
}
handlePassword = (e) => {
  let pass = e.target.value;
  this.setState({pw: pass});
}
submitLogin = () => {
  let {email, pw} = this.state;
  if (email != "" && password != ""){
    axios.get('http://localhost:8080/users/search/email/'+ email+'')
    .then((res) => {
        if (res.data == ""){
          axios.get('http://localhost:8080/publishers/search/email/'+ email+'')
          .then((res2) => {
            if (res2.data == ""){
              alert("You should register first.");
            }else{
                if (res2.data.password == pw){
                  localStorage.setItem("email",res2.data.email);
                  localStorage.setItem("userType","publisher");
                  location.href="http://localhost:3000/main"
                }else{
                  alert("Email or password incorrect");
                }
            }

          })
        } else{
          if(res.data.password == pw){
              localStorage.setItem("userID",res.data.id);
              localStorage.setItem("userType","gamer");
              location.href="http://localhost:3000/main"
          }else{
            alert("Email or password incorrect");
          }

        }
    })
   
  }
}
/******************************************** RENDER ***************************************************/
  render() {
      return (
      <Container maxWidth="md">
        <div style={{ fontFamily: 'Kanit' }}>  
        <div style={{ marginTop: "10vh" }}>
          <Link to={"/"}><img src={logo} style={{width:"30vh", height:"25vh" }}/></Link>
            
        </div>
        <div >
            <Row>
              <InputGroup style={{ display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Label for="email" style={{ color: "#FFCF23"}}> Email</Label>
              <Input
                id="email"
                name="text"
                type="text"
                style={{width: "50vh", borderRadius:"15px", width:"100vw",margin:"10px" }}
                onChange = {(e)=> this.handleEmail(e)}
            />
            </InputGroup>
            </Row>
        </div>
        <div >
            <Row>
              <InputGroup style={{ marginTop: "1vh", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Label for="password" style={{ color: "#FFCF23"}}>Password</Label>
              <Input
                id="password"
                name="text"
                type="password"
                style={{width: "47vh", borderRadius:"15px", width:"100vw",margin:"10px"}}
                onChange = {(e)=> this.handlePassword(e)}
            />
            </InputGroup>
                      <div style={{ marginTop: "1vh" }}>
          <Button  
            size="md" 
            style={{ color: "#7A1ED6", background:"#FFCF23", width: "50vw"}}
            onClick={()=>this.submitLogin()}
            >
              Confirm
          </Button>
          </div>
            </Row>
        </div>
     
        </div>
      </Container>
    );
    }
}