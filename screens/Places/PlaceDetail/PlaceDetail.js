// React
import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text
} from 'react-native';
// Redux
import { useSelector } from 'react-redux';

// Components
import MapPreview from '../../../components/MapPreview/MapPreview';
// Constants
import Colors from '../../../constants/styles/Colors';

// Component
const PlaceDetail = ({ navigation }) => {
    const id = navigation.getParam('id');
    const place = useSelector(state => state.places.places.find(place => place.id === id));
    console.log(place);
    const location = {
        lat: place.lat,
        lng: place.lng
    };

    const previewMapHandler = () => {
        navigation.navigate('Map', {
            readonly: true,
            location: {
                latitude: location.lat,
                longitude: location.lng
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image
                source={{ uri: place.image }}
                style={styles.image}
            />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place.address.street}</Text>
                    <Text style={styles.address}>{place.address.city}</Text>
                </View>
                <MapPreview
                    style={styles.mapPreview}
                    location={location}
                    onPreviewPress={previewMapHandler}
                />
            </View>
        </ScrollView>
    );
};

// Navigation Options
PlaceDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title')
    };
};

// Styles
const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default PlaceDetail;