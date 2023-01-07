import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button, Input} from "reactstrap";
import { ListGroup, Card } from "react-bootstrap";
import Container from '@mui/material/Container';
import axios from 'axios';
import {Link} from "react-router-dom"
import Header from "./Header";
import Select from 'react-select';


const getUserData = async (userID) => {
    const promise = await axios.get('http://localhost:8080/users/search/id/'+userID+'');
    return promise;
}
const getPlayedData = async (gameid) => {
    const promise = await axios.get('http://localhost:8080/games/search/id/'+ gameid+'');
    return promise;
}


export default class gamerProfile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            user: localStorage.getItem("userID"),
            userInfo: [],
            played: [],
            tobeplayed: [],
            playing: [],
            optionsPlaying:[],
            playedHours: {},
            game:"",
            hours:"",
        };
         
    };
    async componentDidMount() {
        //this._isMounted = true;
        this.refreshData();
    }

    refreshData(){
        let _this = this;
        let res = getUserData(this.state.user)
        res.then( (data) => {
            console.log(data.data)
            _this.setState({userInfo: data.data});
            _this.setState({played: data.data.played});
            _this.setState({tobeplayed: data.data.toBePlayed});
            _this.setState({playedHours: data.data.playedHours}, ()=>{
                console.log(this.state.playedHours)
            });
            _this.setState({playing: data.data.playing}, () => {
                let options = []
                for (const id of this.state.playing){
                    options.push({value: id, label: id});
                }
                _this.setState({optionsPlaying: options});
            });
            /*
            let tmp = data.data.played;
            let played_tmp = [];

            for (const id of tmp) {
                let pl = getPlayedData(id);
                pl.then((data) => {
                    played_tmp.push(data.data);
                })
            }
            _this.setState({played: played_tmp});
            _this.setState({loading: false});
            */
        });
          
    }

    handleGameChange(e){
        this.setState({game:e.value});
    }
    handleHoursChange(e){
        this.setState({hours:e.target.value});
    }
    handleSaveHours() {
        let {game, hours, user} = this.state;
        if (game != "" && hours != "" && isNaN(hours)==false){
            let payload = {
                "game_id": game,
                "hours": hours
            } 
            axios.put('http://localhost:8080/users/'+user+'/hours', payload)
            .then((res) => {
                if (res.status == 200){
                    //console.log(res);
                    this.refreshData();
                    alert("Hours saved");
                    window.location.reload(false);
                }else{
                    alert("Something occurred, please try again");
                }
            })
    
        }else {
            alert("Please make sure all fields are filled in correctly. ")
        }
    
    }

    /******************************************** RENDER *************************************************/
render() {
    const {userInfo, played, tobeplayed, playing, optionsPlaying, playedHours} = this.state;

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
                <Row> <div style={{ color: "#FFCF23"}}>Played Games</div></Row>
                <ListGroup as="ol" numbered >
                    {played.map((gameid) =>(
                        <ListGroup.Item as="li" style={{ color: "#7A1ED6"}} ><Link to={"/gameProfile?game="+gameid} style={{textDecoration: "none",  color: "#7A1ED6"}} >{gameid}</Link></ListGroup.Item>
                    ))
                    }
                </ListGroup>

            </Col>
            <Col>
                <Row> <div style={{ color: "#FFCF23"}}>To be Played</div></Row>
                <ListGroup as="ol" numbered >
                {tobeplayed.map((gameid) =>(
                        <ListGroup.Item as="li" style={{ color: "#7A1ED6"}}><Link to={"/gameProfile?game="+gameid} style={{textDecoration: "none", color: "#7A1ED6"}}>{gameid}</Link></ListGroup.Item>
                ))}
            </ListGroup>
            </Col>
            <Col>
            <Row> <div style={{ color: "#FFCF23"}}>Playing</div></Row>
                <ListGroup as="ol" numbered>
                {playing.map((gameid) =>(
                        <ListGroup.Item as="li" style={{ color: "#7A1ED6"}}><Link to={"/gameProfile?game="+gameid} style={{textDecoration: "none",  color: "#7A1ED6"}}>{gameid}</Link>{/*<Button style={{ color:"red", marginLeft:"20px", background:"#FFCF23" }}>Remove</Button>*/}</ListGroup.Item>
                ))}
            </ListGroup>
            </Col>
            </Row>
            </div>
            <div style={{ marginTop: "10vh" }}>
                <h2 style={{color: "#FFCF23"}}>Log Hours</h2>
                <Row>
                    <Col>
                        <Select
                            options = {optionsPlaying}
                            style={{width :'47vh',background:"white", borderRadius:"15px"}}
                            onChange = {(e)=> this.handleGameChange(e)}
                        />
                    </Col>
                    <Col>
                        <Input
                            onChange = {(e) => this.handleHoursChange(e) }
                        >
                        </Input>
                    </Col>
                    <Col>
                        <Button
                            onClick = {()=> this.handleSaveHours()}
                            style={{ color: "#7A1ED6", background:"#FFCF23", width: "20vw"}} 
                        >Save</Button>
                    </Col>
                </Row>
                <br></br>
                <Row> 
                    <div style={{ color: "#FFCF23"}}>Your hours</div>
                        { 
                        Object.keys(playedHours).map((key, ind) =>(
                        <Col>
                            <Card style={{ marginTop: "1vh", background:"#FFCF23"}} >
                            <Card.Body>
                                <Card.Title style={{ color: "#7A1ED6" }}>Game: {key}</Card.Title>
                                <Card.Text style={{ color: "#7A1ED6" }}>Hours: {playedHours[key]}</Card.Text>
                            </Card.Body>
                        </Card>   
                        </Col>
                        ))}
                </Row>

            </div>
        </div>
        </Container>
    );
}};
