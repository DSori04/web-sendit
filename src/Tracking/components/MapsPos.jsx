import React from "react";
import { GoogleMap, useLoadScript, MarkerF, Polyline, LoadScript } from "@react-google-maps/api";
import { DirectionsService } from '@react-google-maps/api';
import { useState } from "react";

const libraries = ["places"];

function SearchBox() {
    const [ libraries ] = useState(["places"]);
    const mapContainerStyle = {
        width: "100%",
        height: "400px",
        borderRadius: "10px"
    };
    const center = {
        lat: 41.112543321888104, lng: 1.2565044470474362
    };
    const target = {
        lat: 41.120441227561926, lng: 1.2435490857768052
    }
    const options = {
        disableDefaultUI: true,
        zoomControl: false,
    };
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyC2NjOkCxNilzHlfGGV9DM9Sgp5iFEw9cA",
        libraries: libraries
    });
    
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const direction = {
        origin: center,
        destination: target,
        travelMode: "WALKING"
    }
    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === "OK") {
                setDirectionsResponse(response);
            } else {
                console.log("response: ", response);
            }
        }
    }
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
            >
                <MarkerF 
                    position={center}
                />
                <MarkerF 
                    position={target}
                />
                <DirectionsService
                    options={direction}
                    callback={directionsCallback}
                />
                {directionsResponse && (
                    <Polyline
                        path={directionsResponse.routes[0].overview_path}
                        options={{
                            strokeColor: "#FF0000",
                            strokeOpacity: 0.75,
                            strokeWeight: 2,
                            icons: [
                                {
                                    icon: "hello",
                                    offset: "0",
                                    repeat: "20px"
                                }
                            ]
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    )
}

export default React.memo(SearchBox);