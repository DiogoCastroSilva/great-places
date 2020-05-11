// React
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    Alert,
} from 'react-native';
// Expo
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// Constants
import Colors from '../../constants/styles/Colors';

// Component
const ImagePicker = () => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const permission = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (permission.status !== 'granted') {
            Alert.alert("Insufficientpermissions!",
                "You need to grant camera permissions to use this app.",
                [{ text: "Close" }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImgPicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                {pickedImage
                    ? <Image
                        style={styles.image}
                        source={{ uri: pickedImage }}
                      />
                    : <Text>No Image picked yet.</Text>
                }
            </View>
            <Button
                title='Take Picture'
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImagePicker;