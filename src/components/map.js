import _ from "lodash";
import React, { Component } from "react";
import MapComponent from './mapComponent';

const URL_GOOGLE_API = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHGt6967ispOV3GgP_sG_np-07B9yYtBU&v=3.exp&libraries=geometry,drawing,places";

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            markers : props.markers
        }
        this.handleMarkerClick=this.handleMarkerClick.bind(this);
        this.handleMarkerClose=this.handleMarkerClose.bind(this);
        this.searchAround = this.searchAround.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ markers: nextProps.markers }); 
    }


    // open marker
    handleMarkerClick(targetMarker){
        console.log('click')
        this.setState({
              markers: this.state.markers.map(marker =>{
                  if(marker === targetMarker) marker.showInfo = true;
                  return marker;
              })
          })
    }
    
    //close marker
    handleMarkerClose(targetMarker){
        console.log('close click')
        this.setState({
            markers: this.state.markers.map(marker =>{
                if(marker === targetMarker) marker.showInfo = false;
                return marker;
            })
        })
    }

    // pass the event to parent component
    searchAround(event){
        this.props.searchGeo(event);
    }

    render() {
        return (
          <div>
              <MapComponent
              googleMapURL={URL_GOOGLE_API}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `600px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              markers={this.state.markers}
              onMarkerClick={this.handleMarkerClick}
              onMarkerClose={this.handleMarkerClose}
              onClickMap={this.searchAround}/>
          </div>
        )
      }

}

export default Map;