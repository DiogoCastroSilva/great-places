import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import * as Location from 'expo-location';

// Actions
export const ADD_PLACE = 'ADD_PLACE';
export const GET_PLACES = 'GET_PLACES';

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const loc = {
            latitude: location.lat,
            longitude: location.lng
        };

        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {

            const response = await Location.reverseGeocodeAsync(loc);
            if (!response || response.length === 0) {
                throw new Error(`Something went wrong while fetching geolocation, ${response}`);
            }

            const address = await JSON.stringify(response[0]);

            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                loc.latitude,
                loc.longitude
            );
            dispatch({
                type: ADD_PLACE,
                place: {
                    id: dbResult.insertId,
                    title,
                    image: newPath,
                    address: response[0],
                    lat: loc.latitude,
                    lng: loc.longitude
                }
            });
        } catch(e) {
            throw new Error(e);
        }
    };
};

export const getPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            const places = dbResult.rows._array.map(place => ({ ...place, address: JSON.parse(place.address) }));
            console.log(dbResult.rows._array);
            dispatch({
                type: GET_PLACES,
                places: places
            });
        } catch (err) {
            throw new Error(err);
        }
        
    };
};