
import React from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MapComponent = compose(
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={2} defaultCenter={{ lat: 40.7128, lng: -74.0060 }} onClick={(event) => props.onClickMap(event)}>
      {props.markers.map((marker, index) => {
        return(
          <div key={index}>
            <Marker onClick={ () => {props.onMarkerClick(marker)}
            }  {...marker}>
            {marker.showInfo && <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                <div>
                  <p>User: {marker.user}</p><small>{marker.createdAt}</small>
                  <p>{marker.text}</p>
                </div>
              </InfoWindow>}
            </Marker>
          </div>
        )
      
      })}
    </GoogleMap>
  
  ));
  
export default MapComponent;
  
