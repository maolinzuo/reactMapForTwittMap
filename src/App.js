import React, { Component } from 'react';
import io from 'socket.io-client';
import Mexp from 'math-expression-evaluator';

import SelectBox from './components/selectbox';
import Map from './components/map'

const URL = "/query";


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      keyword: '',
      markers: [],
      position:{
        lat: '',
        lng: ''
      }
    }
    // handle geo search from child component map.
    this.searchGeo=this.searchGeo.bind(this);
    this.socket = io.connect('/streaming');
    
  }

  // when user enters the page and after component mounts, get tweets and start socket.io between client and server
  componentDidMount(){
    this.getTweets();

    this.socket.emit('connection', 'Client Connect');
    // received a socket that contains one tweet
    this.socket.on('tweet', (item) => {
      // determine whether the tweet matches the keyword
      if(this.state.keyword ==='' || item.keyword === this.state.keyword){
          var markers = this.state.markers;
          const marker = {
            position: {
            lat : item.coordinates[1],
            lng : item.coordinates[0]
            },
            showInfo: false,
            user: item.author,
            createdAt: item.timestamp,
            text: item.text
          }
          //if the tweet was posted within 500km from the position user clicked on,
          //attach it to the state
          if(this.withinDistance(marker.position)){
            markers.push(marker);
            this.setState({
              markers: markers
            });
          }
      }
    });
  }

  //determine whether the tweet was posted within 500km from the position user clicked on
  withinDistance = (position) => {
      if(this.state.position.lat === '') return true;
      var point1Lat = this.state.position.lat;
      var point1Lng = this.state.position.lng;
      const factor = Math.Pi /180;
      var degree = Mexp.math.sin(point1Lat * factor)* Mexp.math.sin(position.lat * factor)+
      Mexp.math.cos(point1Lat* factor)* Mexp.math.cos(position.lng)* Mexp.math.cos(point1Lng - position.lng);
      if(degree * 6378137.8 < 500000) return true;
      return false;
  }


  // set the keyword to the state, set coordinates to null and get tweets accordingly
  // when user changes the keyword from child component selectbox
  handleKeyword = (keyword) => {
    this.setState(
      {
        keyword: keyword,
        position: {
          lat: '',
          lng: ''
        }
      }, function(){
        this.getTweets();
      });
  }

  // handle geo search from child component map
  // set state position and get tweets accordingly
  searchGeo = (event) => {
    console.log('geo search click')
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    this.setState({
      position:{
        lat: lat,
        lng: lng
      }
    }, function() {
      this.getTweets();
    });
  }


  getTweets = () => {
    console.log("Getting tweets with keyword: " + this.state.keyword + " within 500km from coordinate lat: " + this.state.position.lat + ", lng " + this.state.position.lng )
    fetch(`${URL}?keyword=${this.state.keyword}&lat=${this.state.position.lat}&lng=${this.state.position.lng}`,
    {method: 'GET'})
    .then(response => response.json())
    .then((json) => this.setMarkers(json))
  }

  //map the list of object from the api to each marker
  setMarkers = (json) => {
    if(json && json.length > 0){
      this.setState({
        markers : json.map((item) => {
          const marker = {
            position: {
            lat : item.coordinates[1],
            lng : item.coordinates[0]
            },
            showInfo: false,
            user: item.author,
            createdAt: item.timestamp,
            text: item.text
          }
          return marker;
        })
      })
    }
    else(
      this.setState({
        markers: []
      })
    )
  }


  render() {
    return (
      <div className="App">
        <SelectBox onSelectKeyword={this.handleKeyword}/>
        <Map markers={this.state.markers} searchGeo={this.searchGeo} />
      </div>
    );
  }
}

export default App;
