// React
import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Constants
import Colors from '../../constants/styles/Colors';

// Component
const Map = ({ navigation }) => {
    const location = navigation.getParam('location');
    const readonly = navigation.getParam('readonly');

    const [selectedLocation, setSelectedLocation] = useState(location);

    const mapRegion = {
        latitude: location ? location.latitude : 37.78,
        longitude: location ? location.longitude : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = ({ nativeEvent }) => {
        if (readonly) {
            return;
        }
        setSelectedLocation({
            latitude: nativeEvent.coordinate.latitude,
            longitude: nativeEvent.coordinate.longitude
        });
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) return;
        navigation.navigate('NewPlace', { selectedLocation: selectedLocation});
    }, [selectedLocation]);
    
    useEffect(() => {
        navigation.setParams({ saveLocation: savePickedLocationHandler });
    }, [savePickedLocationHandler]);

    return (
        <MapView
            style={styles.map}
            initialRegion={mapRegion}
            onPress={selectLocationHandler}
        >
            {selectedLocation && (
                <Marker
                    title="Selected location"
                    coordinate={selectedLocation}
                />
            )}
        </MapView>
    );
};

Map.navigationOptions = navData => {
    const save = navData.navigation.getParam('saveLocation');
    const readonly = navData.navigation.getParam('readonly');

    if (readonly) return;

    return {
        headerRight: () => (
            <TouchableOpacity
                style={styles.header}
                onPress={save}
            >
                <Text style={styles.headerText}>Save</Text>
            </TouchableOpacity>
        )
    }
};

// Styles
const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    header: {
        marginHorizontal: 20
    },
    headerText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});

export default Map;