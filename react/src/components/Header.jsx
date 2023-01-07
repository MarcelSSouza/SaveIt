import React from "react";
import "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";
import saveit from "./saveit.png"
import exit from "./exit.png"

const Header = () => {
  let [userType, changeUserType] = useState(localStorage.getItem("userType"));
  
  return (
    <div>
      <Navbar bg="black" style={{color: "white"}} fixed="top" expand="lg">
        <Container className="d-flex flex-row justify-content-evenly">
        {userType == "gamer" ?
            <Nav.Link  href="/gamer">Perfil</Nav.Link> : <Nav.Link  href="/profile">Perfil</Nav.Link>}
             {/*<Nav.Link href="/list">Listas</Nav.Link>*/}
            <Nav.Link href="/main"><img src = {saveit} style={{ width: "75px", height: "35px"}}/></Nav.Link>
            <Nav.Link href="/landing"><img src = {exit} style={{ width: "25px", height: "25px"}}/></Nav.Link> 
          </Container>  
      </Navbar>
    </div>
  );
};

export default Header;
