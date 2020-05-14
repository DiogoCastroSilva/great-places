// React
import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    ScrollView,
    Button
} from 'react-native';
// Expo
import * as Permissions from 'expo-permissions';
// Redux
import { useDispatch } from 'react-redux';

// Constants
import Colors from '../../../constants/styles/Colors';
// Actions
import { addPlace } from '../../../store/actions/places';
// Components
import ImagePicker from '../../../components/Pickers/ImagePicker/ImagePicker';
import LocationPicker from '../../../components/Pickers/LocationPicker/LocationPicker';

// Component
const NewPlace = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        // Logic to validate
        setTitle(text);
    };

    const verifyPermissions = async () => {
        const permission = await Permissions.askAsync(Permissions.LOCATION);
        if (permission.status !== 'granted') {
            Alert.alert("Insufficient permissions!",
                "You need to grant location permissions to use this app.",
                [{ text: "Close" }]
            );
            return false;
        }
        return true;
    };

    const savePlace = async () => {
        const permission = await verifyPermissions();
        if (!permission) return;
        dispatch(addPlace(title, selectedImage, selectedLocation));
        navigation.goBack();
    };

    const imageSelectedHandler = imagePath => {
        setSelectedImage(imagePath);
    };

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location);
    }, []);

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
                <LocationPicker
                    navigation={navigation}
                    onLocationPicked={locationPickedHandler}
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