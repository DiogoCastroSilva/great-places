// React
import { Platform } from "react-native";
// Navigation
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

// Screens
import Places from "../screens/Places/Places";
import PlaceDetail from "../screens/Places/PlaceDetail/PlaceDetail";
import NewPlace from "../screens/Places/NewPlace/NewPlace";
import MapView from "../screens/MapView/MapView";
// Constants
import Colors from "../constants/styles/Colors";



const PlacesNavigator = createStackNavigator(
    {
        Places: Places,
        PlaceDetail: PlaceDetail,
        NewPlace: NewPlace,
        MapView: MapView
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
);

export default createAppContainer(PlacesNavigator);