// React
import React, { useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    Platform,
} from 'react-native';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getPlaces } from '../../store/actions/places';
// Navigation
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import CustomHeaderButton from '../../components/UI/CustomHeaderButton/CustomHeaderButton';
import PlaceItem from '../../components/PlaceItem/PlaceItem';


// Component
const Places = ({ navigation }) => {
    const places = useSelector(state => state.places.places);
    console.log(places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaces());
    }, [dispatch]);

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PlaceItem
                    image={itemData.item.image}
                    title={itemData.item.title}
                    address={itemData.item.address}
                    onSelect={() => navigation.navigate('PlaceDetail', {
                        id: itemData.item.id,
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