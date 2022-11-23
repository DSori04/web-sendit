import { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2NjOkCxNilzHlfGGV9DM9Sgp5iFEw9cA",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
        {(selected && selected != "") && <span className="text-red1">{`${selected.lat} ${selected.lng}`}</span>}
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    console.log(lat, lng)
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
// function MapComponent() {
//     const [selected, setSelected] = useState(null);
//     return (
//         <LoadScript
//             googleMapsApiKey="AIzaSyC2NjOkCxNilzHlfGGV9DM9Sgp5iFEw9cA"
//         >
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={10}
//             >
//                 {/* <Marker
//                     position={center}
//                 />
//                 <Marker 
//                     position={alter} /> */}
//                 {/* <DistanceMatrixService
//                     options={{
//                         destinations: [center],
//                         origins: [alter],
//                         travelMode: 'DRIVING'
//                     }}
//                     callback={response => {
//                         console.log(response);
//                     }}
//                 /> */}
//                 {/* <DirectionsService
//                     options={{
//                         destination: center,
//                         origin: alter,
//                         travelMode: 'DRIVING'
//                     }}
//                     callback={response => {
//                         console.log(response);
//                     }}
//                 /> */}
//                 {/* <DirectionsRenderer
//                     options={{
//                         directions: response
//                     }}
//                 /> */}
//             </GoogleMap>
//         </LoadScript>
//     )
// }

// export default React.memo(MapComponent)