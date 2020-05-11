// React
import React from 'react';
import {
    StyleSheet,
    View,
    Platform,
} from 'react-native';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';


// Component
const Places = () => {
    return (
        <View>
            
        </View>
    );
};

// Navigation Options
Places.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add Place"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace')
                    }}
                />
            </HeaderButtons>
        )
    };
};

// Styles
const styles = StyleSheet.create({});

export default Places;