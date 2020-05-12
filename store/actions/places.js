import * as FileSystem from 'expo-file-system';
import { insertPlace } from '../../helpers/db';

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
            const dbResult = await insertPlace(
                title,
                newPath,
                'Rua 5',
                15.6,
                12.3
            );
            dispatch({
                type: ADD_PLACE,
                place: {
                    id: dbResult.insertId,
                    title,
                    newPath
                }
            });
        } catch(e) {
            throw new Error(e);
        }

        
    };
};