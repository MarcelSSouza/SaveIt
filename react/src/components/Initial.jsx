import React from "react";
import Form from "react-bootstrap/Form";
import logo from "./logo.png";
import { Row, InputGroup, Button, Col} from "reactstrap";
import { ListGroup } from "react-bootstrap";
import Container from '@mui/material/Container';
import Slider from "react-slick";
import axios from 'axios';
import {Link} from "react-router-dom"
import Header from "./Header";


var settings = {
  dots: true,
  infinite: false,
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  variableWidth: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 310,
      settings: {
        slidesToShow: 1,
    
      }
    }
  ]
};
const inputStyle = {
  width: "60vw",
  height: "30px",
  fontSize: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "5px",}

export default class Initial extends React.Component{
  
  constructor(props) {
      super();
      this.state = {
        searchText: "",
        top10Games: [],
        top10Recent: [],
      };
     

      
  };
  /******************************************** LIFECYCLE *************************************************/
async componentDidMount() {
  this._isMounted = true;
  let userID = localStorage.getItem("userID");

  axios.get('http://localhost:8080/games/search/top10')
    .then((res) => {
      this.setState({top10Games:res.data});
    })
  axios.get('http://localhost:8080/games/search/recent10')
    .then((res) => {
      this.setState({top10Recent:res.data});
    })

  
}

componentWillUnmount() {
  this._isMounted = false;
}

  /******************************************** HANDLERS *************************************************/
  handleSearchText = (e) => {
    let searchText = e.target.value;
    this.setState({searchText: searchText});
  }
  /******************************************** RENDER ***************************************************/
  render() {
    return (
    
      <Container maxWidth="md">
        <Header/>
        <div style={{ fontFamily: 'Kanit' }}>
          <div style={{ marginTop: "10vh" }}>
            
            <img src={logo} style={{width:"50vh", height:"40vh" }}/>
            <InputGroup className="lg">
              <Form.Control
                style={{ width: "50vw", height: "6vh" }}
                placeholder="Game name"
                aria-describedby="basic-addon2"
                //value={props.searchTerm}
                onChange={(e)=> this.handleSearchText(e)}
              />
              <Link to={"/results?search="+this.state.searchText}>
              <Button style={{ color: "#7A1ED6", background:"#FFCF23", height: "6vh"}} id="button-addon2">
                Search
              </Button>
              </Link>
            </InputGroup>
        </div>
        <div style={{ marginTop: "10vh" }}>
        <Row>
          <Col>
            <Row> <div style={{ color: "#FFCF23"}}>Top 10 rated games</div></Row>
            <ListGroup as="ol" numbered >
              {this.state.top10Games.map((game) =>(
                <Link to={"/gameProfile?game="+game.gameid} style={{textDecoration: "none"}}><ListGroup.Item as="li" style={{ color: "#7A1ED6"}}>{game.name}</ListGroup.Item></Link>
              ))}
          </ListGroup>
          </Col>
          <Col>
          <Row> <div style={{ color: "#FFCF23"}}>Top 10 recent games</div></Row>
            <ListGroup as="ol" numbered>
            {this.state.top10Recent.map((game) =>(
                <Link to={"/gameProfile?game="+game.gameid} style={{textDecoration: "none"}}><ListGroup.Item as="li" style={{ color: "#7A1ED6"}}>{game.name}</ListGroup.Item></Link>
              ))}
          </ListGroup>
          </Col>
        </Row>


        </div>
      </div>
    </Container>
  );
}
};