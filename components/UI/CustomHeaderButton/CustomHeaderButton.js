// React
import React from 'react';
import {
    Platform,
} from 'react-native';
// Expo
import { Ionicons } from '@expo/vector-icons';
// Navigation
import { HeaderButton } from 'react-navigation-header-buttons';

// Constants
import Colors from '../../../constants/styles/Colors';

// Component
const CustomHeaderButton = props => {
    return <HeaderButton
                {...props}
                IconComponent={Ionicons}
                iconSize={23}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
            />
};

export default CustomHeaderButton;