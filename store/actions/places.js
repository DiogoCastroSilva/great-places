import * as FileSystem from 'expo-file-system';

// Actions
export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
        } catch(e) {
            throw new Error(e);
        }

        dispatch({
            type: ADD_PLACE,
            place: {
                title,
                newPath
            }
        });
    };
};