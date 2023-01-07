import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Button, Input} from "reactstrap";
import { ListGroup, Card } from "react-bootstrap";
import Container from '@mui/material/Container';
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import Select from 'react-select';


const getData = async (name) => {
    const promise = await axios.get('http://localhost:8080/games/search/publisher/'+name+'');
    return promise;
}
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
      
  }  


const PublisherProfile = () => {
    let query = useQuery();
    let [name, changeNameValue] = useState(query.get("name"));
    let [games, changeGames] = useState([]);

    let res = getData(name)
    .then((res) => {
        changeGames(res.data);
    })
  
    return (
        <Container maxWidth="md">
            <Header/>
            <div style={{ fontFamily: 'Kanit' }}>
            <div style={{ marginTop: "10vh" }}>
                <Row> <h1 style={{color: "#FFCF23"}}>{name}</h1></Row>
                <br></br>
                <br></br>
            <Row>
                <Col>
                    <Row> <div style={{ color: "#FFCF23"}}>Other Games</div></Row>
                    <Row>
                        {games.map((game) =>(
                            <Col>
                            <Card style={{ marginTop: "1vh", background:"#7A1ED6"}} bg="#808080" >
                              <Card.Img variant="top" src={game.imageurl} />
                              <Card.Body>
                                  <Card.Title style={{ color: "#FFCF23" }}>{game.name}</Card.Title>
                                  {/*<Card.Text>{game.summary}</Card.Text>*/}
                                  <div className="d-flex justify-content-evenly">
                                  <Link to={"/gameProfile?game="+game.gameid}>
                                  <Button style={{ color: "#7A1ED6", background:"#FFCF23" }}> See more </Button>
                                  </Link>
                                  </div>
                              </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            </div>
        </div>
        </Container>
    );
};
export default PublisherProfile;
