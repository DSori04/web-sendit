import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBpL4s6zh0bnHbU1E6N4hsVpqyb2XA963Q")
Geocode.setLanguage("es")
Geocode.setRegion("es")
Geocode.setLocationType("ROOFTOP")
Geocode.enableDebug()

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
            // const resp = response.results[0].address_components;
            // console.log(resp)
            console.log(response.results[0].address_components[1])
            const city = response.results[0].address_components[1]['long_name'];
            return city;
        })
        .catch(error => {
            console.error(error);
        });
}