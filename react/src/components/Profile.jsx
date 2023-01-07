import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button, Input, InputGroup, Label} from "reactstrap";
import { ListGroup, Card } from "react-bootstrap";
import Container from '@mui/material/Container';
import axios from 'axios';
import {Link} from "react-router-dom"
import Header from "./Header";
import Multiselect from 'multiselect-react-dropdown';



const getUserData = async (email) => {
    const promise = await axios.get('http://localhost:8080/publishers/search/email/'+email+'');
    return promise;
}
const getPlayedData = async (gameid) => {
    const promise = await axios.get('http://localhost:8080/games/search/id/'+ gameid+'');
    return promise;
}

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
export default class Profile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: localStorage.getItem("email"),
            userInfo: [],
            games: [],
            name:"",
            summary:"",
            genres:[],
        };
         
    };
    async componentDidMount() {
        //this._isMounted = true;
        this.refreshData();
    }

    refreshData(){
        let _this = this;
        let res = getUserData(this.state.email)
        res.then( (data) => {
            this.setState({userInfo:data.data})
            this.setState({games:data.data.gamesOwned})
          })
    }

    handleName = (e) => {
      let name = e.target.value;
      this.setState({name: name});
    }
    handleSummary = (e) => {
      let summary = e.target.value;
      this.setState({summary: summary});
    }
    handleAddGenres = (e )=>{
      let { genres} = this.state;
      this.setState({genres:e});
    };
    handleRemoveGenres = (e )=>{
      let {genres } = this.state;
      this.setState({genres:e});
    };

    submitGame = () => {
      let {name, summary, genres, userInfo } = this.state;
      let genres_tmp = []
      
      if (name != "" && summary != "" && genres.length > 0){
        genres.map((g) => ( genres_tmp.push(g.name)));
        console.log(genres_tmp)
        const payload = {
            name: name,
            publisher: userInfo.name,
            summary: summary,
            genre: genres_tmp
        }
        axios.post('http://localhost:8080/games', payload )
          .then((res) => {
            //console.log(res);
              if (res.status == 200) {
                axios.put('http://localhost:8080/publishers/publish/'+userInfo.id+'/'+res.data.gameid)
                  .then((res2) => {
                    console.log(res2);
                    if (res2.status == 200) {
                      this.refreshData();
                      alert("Game added");
                      //window.location.reload(false);
                    }else {
                      alert("Please try again ");
                    }
                  })
                
              }else {
                alert("Please try again ");
              }
        });
        
      } else {
        alert("Please make sure all fields are filled in correctly. ");
      }
    }

    /******************************************** RENDER *************************************************/
render() {
  let {userInfo, games} = this.state;
    return (
        <Container maxWidth="md">
            <Header/>
            <div style={{ fontFamily: 'Kanit' }}>
            <div style={{ marginTop: "10vh" }}>
                <Row> <h1 style={{color: "#FFCF23"}}>Hello, {userInfo.name}</h1></Row>
                <br></br>
                <br></br>
            <Row>
            <Col>
                <Row> <div style={{ color: "#FFCF23"}}>Your Games</div></Row>
                <ListGroup as="ol" numbered >
                  {console.log(games)}
                    {games.length > 0 ? games.map((game) =>(
                        <ListGroup.Item as="li" style={{ color: "#7A1ED6"}} ><Link to={"/gameProfile?game="+game} style={{textDecoration: "none",  color: "#7A1ED6"}} >{game}</Link></ListGroup.Item>
                    )): <div>No game added yet</div>}
                </ListGroup>
            </Col>
            </Row>
            <Row>
            <div style={{ marginTop: "10vh" }}>
                <h2 style={{color: "#FFCF23"}}>Add a new game</h2>
                

                <div>
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
                <div>
                  <Row>
                    <InputGroup style={{ marginTop: "3vh", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                      <Label for="summary" style={{ color: "#FFCF23", marginRight:"15px"}}> Summary </Label>
                      <Input
                        id="summary"
                        name="text"
                        type="textarea"
                        placeholder= "..."
                        onChange = {(e)=> this.handleSummary(e)}
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
                placeholder= "Choose genres of game..."
                displayValue="name"
                onSelect={(e)=>this.handleAddGenres(e)}
                onRemove={(e)=>this.handleRemoveGenres(e)}
                />
              </div>
            </InputGroup>
            </Row>
            <Row>
            <div style={{ marginTop: "1vh", }}>
            <Button  
              size="sm" 
              style={{ color: "#7A1ED6", background:"#FFCF23", width: "20vw"}} 
              onClick={()=>this.submitGame()}
            >
                Submit
            </Button>
          </div>
         </Row> 
        </div>
            
            </div>
            </Row>

            </div>
        </div>
        </Container>
    );
}};
