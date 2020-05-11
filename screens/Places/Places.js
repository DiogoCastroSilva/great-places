// React
import React from 'react';
import {
    StyleSheet,
    View,
    Platform,
} from 'react-native';
// Redux
import { useSelector } from 'react-redux';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import { FlatList } from 'react-native-gesture-handler';
import PlaceItem from '../../components/PlaceItem/PlaceItem';


// Component
const Places = ({ navigation }) => {
    const places = useSelector(state => state.places.places);
    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={null}
                    title={itemData.item.title}
                    address={null}
                    onSelect={() => navigation.navigate('PlaceDetail', {
                        id: itemData.id,
                        title: itemData.item.title
                    })}
                />
            )}
        />
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