import React from "react";
import "react-bootstrap";
import { Container, Modal } from "react-bootstrap";
import logo from "./logo.png";
import {
  Row,
  InputGroup,
  Input,
  Button,
  Label
} from "reactstrap";
import Multiselect from 'multiselect-react-dropdown';
import "../App.css";
import {Link} from "react-router-dom";
import axios from "axios";
import Landing from "./Landing"

let options =  [{name: 'First-Person', id: 1},
                {name: 'Shooter', id: 2},
                {name: 'Arcade', id: 3},
                {name: 'Action', id: 4},
                {name: 'Sports', id: 5},
                {name: 'Strategy', id: 6},
                {name: 'Adventure', id: 7},
                {name: 'Fantasy', id: 8},
                {name: 'Puzzle', id: 9},
                {name: 'Virtual Life', id: 10},
                {name: 'Automobile', id: 11},
                {name: 'Combat', id: 12}]
export default class GameProfile extends React.Component{
  constructor(props) {
      super();
      this.state = {
        name: "",
        email: "",
        pw: "",
        genres:[]
      };
  };
/******************************************** HANDLERS *************************************************/
handleName = (e) => {
  let name = e.target.value;
  this.setState({name: name});
}
handleEmail = (e) => {
  let email = e.target.value;
  this.setState({email: email});
}
handlePassword = (e) => {
  let pass = e.target.value;
  this.setState({pw: pass});
}
handleAddGenres = (e )=>{
  let { genres} = this.state;
  this.setState({genres:e});
};
handleRemoveGenres = (e )=>{
  let {genres } = this.state;
  this.setState({genres:e});
};
submitRegister = () => {
  let {name, email, pw, genres } = this.state;
  let genres_tmp = []
  if (name != "" && email != "" && pw != "" && genres.length > 0){
    genres.map((g) => ( genres_tmp.push(g.name)));
    let payload = {
      "name": name,
      "email": email,
      "password": pw,
      "favoriteGenre": genres_tmp
    }
    axios.post('http://localhost:8080/users', payload )
      .then((res) => {
          if (res.status == 200) {
            alert("User Created");
            location.href="http://localhost:3000/"
          }
    });
  } else {
    alert("Please make sure all fields are filled in correctly. ")
  }
}
/******************************************** RENDER ***************************************************/
  render() {
      return (

      <Container maxWidth="md">
        <div style={{ fontFamily: 'Kanit' }}>  
        <div style={{ marginTop: "10vh" }}>
          <Link to={"/"}><img src={logo} style={{width:"30vh", height:"25vh" }}/></Link>
            <h2 style={{ color: "#FFCF23" }}> Register</h2>
        </div>
        <div  >
            <Row>
              <InputGroup style={{ marginTop: "3vh", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Label for="name" style={{ color: "#FFCF23", marginRight:"15px"}}> Name </Label>
              <Input
                id="name"
                name="text"
                type="text"
                style={{width: "50vh", borderRadius:"15px"}}
                onChange = {(e)=> this.handleName(e)}
            />
            </InputGroup>
            </Row>
        </div>
<div  >
            <Row>
              <InputGroup style={{ marginTop: "3vh", display: 'flex',  justifyContent:'center', alignItems:'center'}}> 
              <Label for="email" style={{ color: "#FFCF23", marginRight:"15px"}}> Email </Label>
              <Input
                id="email"
                name="text"
                type="text"
                style={{width: "50vh", borderRadius:"15px"}}
                onChange = {(e)=> this.handleEmail(e)}
            />
            </InputGroup>
            </Row>
        </div>
        <div >
            <Row>
              <InputGroup style={{ marginTop: "3vh", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Label for="password" style={{ color: "#FFCF23", marginRight:"1vw"}}> Password </Label>
              <Input
                id="password"
                name="text"
                type="password"
                style={{width: "47vh", borderRadius:"15px"}}
                onChange = {(e)=> this.handlePassword(e)}
            />
            </InputGroup>
            </Row>
        </div>
        <div >
            <Row>
              <InputGroup style={{ marginTop: "3vh", display: 'flex',  justifyContent:'center', alignItems:'center'}}>

              <div style={{ width: "75vw",background:"white", borderRadius:"15px"}}>
      
              <Multiselect
                id="genres"
                options={options}
                style={{width :'47vh',background:"white", borderRadius:"15px"}}
                placeholder= "Choose your favorite genres of games..."
                displayValue="name"
                onSelect={(e)=>this.handleAddGenres(e)}
                onRemove={(e)=>this.handleRemoveGenres(e)}
                />
              </div>
            </InputGroup>
            </Row>
        </div>
        <Row>
          <div style={{ marginTop: "1vh", }}>
          <Button  
            size="sm" 
            style={{ color: "#7A1ED6", background:"#FFCF23", width: "20vw"}} 
            onClick={()=>this.submitRegister()}
          >
              Submit
          </Button>
          </div>
         </Row> 
                  
        </div>
      </Container>
    );
    }
  }