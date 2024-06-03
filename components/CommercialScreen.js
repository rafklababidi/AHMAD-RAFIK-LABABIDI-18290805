import React from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const CommercialScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Image source={require('../assets/ads1.jpg')} style={styles.imgStyle} />
                <Image source={require('../assets/ads2.jpg')} style={styles.imgStyle} />
                <Image source={require('../assets/ads3.jpg')} style={styles.imgStyle} />
                <Image source={require('../assets/ads2.jpg')} style={styles.imgStyle} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    imgStyle: {
        width: Dimensions.get('window').width - 20,
        height: 400,
        margin: 10
    }
});

export default CommercialScreen;
