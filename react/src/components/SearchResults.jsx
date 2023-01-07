import React from "react";
import { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Container from '@mui/material/Container';
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import Header from "./Header";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
    
}  
const getData = async (searchValue) => {
    if(searchValue != ""){
       const promise = await axios.get('http://localhost:8080/games/search/names/' + searchValue + '');
       return promise;
    }else{
        const promise = await axios.get('http://localhost:8080/games');
        return promise;
    }
}
const SearchResults = () => {
  let query = useQuery();
  let [searchValue, changeSearchValue] = useState(query.get("search"));
  let [results, changeResultsValue] = useState([]);

  useEffect(() => {
    
    /*axios.get('http://localhost:8080/games/search/names/' + searchValue + '')
    .then((res) => {
        changeResultsValue(res.data);
        //console.log(results);
  });*/
    let res = getData(searchValue);
    res.then((data) => {

      changeResultsValue(data.data);
    })
    
   

  }, []);

return (

  <Container maxWidth="md">
    <Header/>
  <div style={{ fontFamily: 'Kanit' }}>
  <Row>
      <h2 style={{ color: "#FFFEFC" }}> Results for:  </h2> <h2 style={{ color: "#FFCF23" }}> {searchValue}  </h2>
  </Row>
    <Row xs={1} md={4} className="g-4">
      {results.map((game) => (
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
      ))
        }
    </Row>
    </div>
  </Container>

  )
}

export default SearchResults;

