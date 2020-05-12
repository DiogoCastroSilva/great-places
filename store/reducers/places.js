import { ADD_PLACE, GET_PLACES } from "../actions/places";
import Place from "../../models/place";

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.id.toString(),
                action.place.title,
                action.place.image
            );
            return {
                ...state,
                places: state.places.concat(newPlace)
            };
        case GET_PLACES:
            return {
                places: action.places.map(pl =>
                    new Place(
                        pl.id.toString(),
                        pl.title,
                        pl.image
                    )
                )
            };
        default:
            return state;
    }
};