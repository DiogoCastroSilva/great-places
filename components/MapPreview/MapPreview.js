// React
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Component
const MapPreview = ({
    style,
    location,
    children,
    onPreviewPress
}) => {

    let imagePreviewURL
    if (location) {
        // imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${location.lat},${location.lng}&key=${ENV.googleAPIKey}`;
        imagePreviewURL = {
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }

    }

    return (
        <TouchableOpacity
            style={{ ...style, ...styles.imagePreview}}
            onPress={onPreviewPress}
        >
            {location
                ? (
                    <MapView style={styles.mapImage} region={imagePreviewURL}>
                        <Marker
                            coordinate={{
                                latitude: location.lat,
                                longitude: location.lng
                            }}
                        />
                    </MapView>
                ) : children
            }
        </TouchableOpacity>
    );
};

// Styles
const styles = StyleSheet.create({
    imagePreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});
export default MapPreview;