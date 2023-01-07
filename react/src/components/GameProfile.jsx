import React from "react";
import { Col, Row, InputGroup, Input, Button } from "reactstrap";
import { Card } from "react-bootstrap";
import star from "./1828961.png"
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
      
}

const getData = async (gameID) => {
    const promise = await axios.get('http://localhost:8080/games/search/id/'+gameID+'');
    
    return promise;

}


const GameProfile= () => {
    let query = useQuery();
    let [userid, changeuserid] = useState(localStorage.getItem("userID"));
    let [gameID, changeGameID] = useState(query.get("game"));
    let [gameInfo, changeResultsValue] = useState([]);
    let [comment, changeComment] = useState("");
    let [rating, changeRating] = useState("");
    
    useEffect(() => {
        let res = getData(gameID);
        res.then((data) => {
            changeResultsValue(data.data);
          })
    }, []);
    const handleComment = (e) => {
        let c = e.target.value;
        changeComment(c);
    }
    const handleRating = (e) => {
        let r = e.target.value;
        changeRating(r);
    }
    const handleAddToBePlayed = (gameid) => {
        
        const payload = {
            "game_id":gameid,
            "list_type":"tobeplayed"
          };
          let userid = localStorage.getItem("userID");
        
        axios.put('http://localhost:8080/users/'+userid+'/addlist', payload )
          .then((res) => {
            if (res.status == 200){
                alert("Added to list");
            }else{
                alert("Something occurred, please try again");
            }
          })   
    }
    const handleAddToPlayed = (gameid) => {
        const payload = {
            "game_id":gameid,
            "list_type":"played"
          };
        let userid = localStorage.getItem("userID");
        
          if (comment != "" && rating != "" && isNaN(rating)==false && rating>=0 && rating <=10){
            axios.put('http://localhost:8080/users/'+userid+'/addlist', payload)
                .then((res) => {
                    if (res.status == "200"){
                        const payload2 = {
                            "comment": comment,
                            "rating" : rating
                        }                    
                        axios.put('http://localhost:8080/games/rating/'+gameid, payload2)
                        .then((res2) => {
                            if (res2.status == "200"){
                                alert("Comment added");
                                window.location.reload(false);
                            }else{
                                alert("Something occurred, please try again");
                            }
                        })
                    }else{
                        alert("Something occurred, please try again");
                    }
                    
            })  

          }else{
            alert("You should add a comment and a rating(0-10)")
          }
    } 
    const handleAddToPlaying = (gameid) =>{
        const payload = {
            "game_id": gameid,
            "list_type":"playing"
          };
        let userid = localStorage.getItem("userID");
        axios.put('http://localhost:8080/users/'+userid+'/addlist', { game_id: gameID, list_type:"playing"} )
        .then((res) => {
            if (res.status == 200){
                alert("Added to list");
            }else{
                alert("Something occurred, please try again");
            }
          })  
            
    }    
/******************************************** RENDER ***************************************************/
        return (
            <Container maxWidth="md">
            <Header/>
            <div style={{ fontFamily: 'Kanit' }}>
                    <Row> 
                        <Col>
                            <Row>
                                   <br></br> 
                                   <br></br>
                            </Row>
                            <Row>
                                <div style={{ color: "#FFCF23" }}> <h5><img src={star} style={{ width: "24px", height: "26px"}} /> {gameInfo.userrate}/10</h5> </div>
                            </Row>
                            <Row>
                                <div><img src={gameInfo.imageurl} style={{ width: "18vw", height: "35vh" , disply:'flex', alignItems:'center'}} /> </div>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h2 style={{ color: "#FFFEFC" }}> {gameInfo.name} </h2>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{ color: "#FFCF23", display:'flex', alignContent:'left'  }}> { Array.isArray(gameInfo.publisher)? [... new Set(gameInfo.publisher)].map((g)=> (<Link style={{textDecoration:"none",color: "#FFCF23" }} to={"/publisher?name="+g}>g</Link> + ', ')) : <Link style={{textDecoration:"none",color: "#FFCF23" }} to={"/publisher?name="+gameInfo.publisher}>{gameInfo.publisher}</Link>} </div>
                                </Col>
                                <Col>
                                    <div style={{ color: "#FFCF23", display:'flex', alignContent:'right'  }}> {gameInfo.releasedate}</div>
                                </Col>
                            </Row>
                            <Row>
                                <br></br>
                            </Row>
                            <Row>
                                <Row><div style={{  color: "#FFFEFC", textAlign:'justify' }}> {gameInfo.summary} </div> </Row>
                                <Row> <br></br> </Row>
                                <Row><div style={{  color: "#FFCF23", textAlign:'justify' }}> GENRE:  </div> <div style={{  color: "#FFFEFC" }}> {[... new Set(gameInfo.genre)].map((g)=> (g + ', '))} </div></Row>
                                <Row> <br></br> </Row>
                                <Row> 
                                    <div>
                                    {/*<Button  size="sm" style={{ color: "#7A1ED6", background:"#FFCF23", marginRight: '10px'}} onClick={()=>handleAddToPlayed(gameID)}>
                                        Add to Played
        </Button>*/}
                                    
                                    <Button  size="sm" style={{ color: "#7A1ED6", background:"#FFCF23", marginRight: '10px'}} onClick={()=>handleAddToBePlayed(gameID)} >
                                        Add to Wish to Play 
                                    </Button>
                                    <Button  size="sm" style={{ color: "#7A1ED6", background:"#FFCF23"}} onClick={()=>handleAddToPlaying(gameID)} >
                                        Add to Playing
                                    </Button>
                                    </div>
                                 </Row>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <br></br>
                        <br></br>
                    </Row>
                    <Row>
                        <div style={{  color: "#FFCF23", textAlign:'justify' }}> <h5>Share your opinion about this game:  </h5> </div> 
                    </Row>
                    <Row style={{height:"150px"}}>
                        <InputGroup>
                            <Input
                                id="comment"
                                name="text"
                                type="textarea"
                                placeholder= "Leave a comment..."
                                onChange = {(e)=> handleComment(e)}
                             />
                             
                        </InputGroup>
                    </Row>
                    <Row>
                        <br></br>
                    </Row>
                    <Row style={{marginTop:"15px"}}>
                        
                        <Row>
                            <Col>
                        <Input
                                placeholder= "Insert rating..."
                                style = {{width: "150px"}}
                                onChange = {(e)=> handleRating(e)}
                        />
                        </Col>
                        <Col>
                        <Button  size="sm" style={{ color: "#7A1ED6", background:"#FFCF23", width: "20vh"}} onClick={()=>handleAddToPlayed(gameID)}>
                            Submit and Add to Played
                        </Button>
                        </Col>
                        </Row>
                        
                       </Row> 
                    <Row>
                        <br></br>
                        <br></br>
                    </Row>
                    <Row>
                        <div style={{  color: "#FFCF23", textAlign:'justify' }}> <h5>See what other players think of this game:  </h5> </div> 
                    </Row>
                    <Row xs={1} md={4} className="g-4">
                        {gameInfo.comments? gameInfo.comments.map((comment) => (
                            <Col>
                            <Card style={{ marginTop: "1vh", background:"#FFCF23"}} >
                                <Card.Body>
                                    <Card.Title style={{ color: "#7A1ED6" }}>{comment.rating}</Card.Title>
                                    <Card.Text style={{ color: "#7A1ED6" }}>{comment.comment}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        )) : <br></br>
                            }
                    </Row>

            </div>
            </Container>
            );

        };
export default GameProfile;
