import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyBpL4s6zh0bnHbU1E6N4hsVpqyb2XA963Q")
Geocode.setLanguage("es")
Geocode.setRegion("es")
Geocode.setLocationType("ROOFTOP")

/** @param address Address of the location that we want to get coords for
 * @return coords An object with the latitude and longitude of the address {lat, lng}
 */
export const getGeolocation =  async (address) => {
    return Geocode.fromAddress(address)
        .then(response => {
            const { lat, lng } = response.results[0].geometry.location;
            return { lat, lng };
        })
        .catch(error => {
            console.error(error);
        });
};

export const getCity = async (zipcode) => {
    return Geocode.fromAddress(zipcode)
        .then(response => {
            const city = response.results[0].address_components[1]['long_name'];
            return city;
        })
        .catch(error => {
            console.error(error);
        });
}

export const getCP = async(address) => {
    return Geocode.fromAddress(address)
        .then(response => {
            const cp = response.results[0].address_components;
            return cp;
        })
        .catch(error => {
            console.error(error);
        });
}