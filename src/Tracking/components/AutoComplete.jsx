import Autocomplete from "react-google-autocomplete";
import React from "react";

function Completer() {
    return (
        <Autocomplete
            apiKey="AIzaSyBpL4s6zh0bnHbU1E6N4hsVpqyb2XA963Q"
            onPlaceSelected={(place) => {
                console.log(place);
            }}
        />
    )
}

export default React.memo(Completer);