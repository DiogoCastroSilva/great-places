// React
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native';
// Expo
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Constants
import Colors from '../../../constants/styles/Colors';
import MapPreview from '../../MapPreview/MapPreview';

// Component
const LocationPicker = ({
    navigation,
    onLocationPicked
}) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const manualSelectedLocation = navigation.getParam('selectedLocation');

    useEffect(() => {
        if (manualSelectedLocation) {
            setSelectedLocation({
                lat: manualSelectedLocation.latitude,
                lng: manualSelectedLocation.longitude
            });
            onLocationPicked({
                lat: manualSelectedLocation.latitude,
                lng: manualSelectedLocation.longitude
            });
        }
    }, [manualSelectedLocation, onLocationPicked, setSelectedLocation])

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

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            setSelectedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch(e) {
            Alert.alert(
                'Could not find location',
                'Please try again later or pick a location on the map',
                [{ text: 'Close' }]
            );
        }
        setIsFetching(false);
        
    };

    const previewPressHandler = () => {
        navigation.navigate('Map');
    };

    return (
        <View style={styles.container}>
            <MapPreview
                style={styles.imagePreview}
                location={selectedLocation}
                onPreviewPress={previewPressHandler}
            >
                {isFetching
                    ? <ActivityIndicator
                        size="large"
                        color={Colors.primary}
                      />
                    : <Text>No location chosen yet!</Text>
                }
            </MapPreview>
            <Button
                title="Get user location"
                color={Colors.primary}
                onPress={getLocationHandler}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },
    imagePreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LocationPicker;