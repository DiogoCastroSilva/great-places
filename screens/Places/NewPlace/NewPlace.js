// React
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ScrollView,
    Button
} from 'react-native';
// Redux
import { useDispatch } from 'react-redux';

// Constants
import Colors from '../../../constants/styles/Colors';
// Actions
import { addPlace } from '../../../store/actions/places';
// Components
import ImagePicker from '../../../components/ImagePicker/ImagePicker';

// Component
const NewPlace = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        // Logic to validate
        setTitle(text);
    };

    const savePlace = () => {
        dispatch(addPlace(title, selectedImage));
        navigation.goBack();
    };

    const imageSelectedHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={titleChangeHandler}
                />
                <ImagePicker
                    getImage={imageSelectedHandler}
                />
                <Button
                    title="Save Place"
                    color={Colors.primary}
                    onPress={savePlace}
                />
            </View>
        </ScrollView>
    );
};

// Navigation Options
NewPlace.navigationOptions = {
    headerTitle: 'Add Place'
};

// Styles
const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlace;