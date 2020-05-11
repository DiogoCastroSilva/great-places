// React
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
// Redux
import { useSelector } from 'react-redux';

// Component
const PlaceDetail = ({ navigation }) => {
    const id = navigation.getParam('id');
    const place = useSelector(state => state.places.places.find(place => place.id === id));
    
    return (
        <View>
            
        </View>
    );
};

// Navigation Options
PlaceDetail.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title')
    };
};

// Styles
const styles = StyleSheet.create({});

export default PlaceDetail;