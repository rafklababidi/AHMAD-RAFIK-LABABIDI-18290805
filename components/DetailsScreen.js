import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import resultsData from '../data/results.json'; // Importing results data
import { Ionicons } from '@expo/vector-icons';

const DetailsScreen = ({ route }) => {
    const { itemId } = route.params;
    const [item, setItem] = useState(null);

    useEffect(() => {
        // Find the item by its ID in the results data
        const selectedItem = resultsData.find(result => result.id === itemId);
        // Increment views count by 1
        selectedItem.views++;
        // Update the item with the new views count
        setItem(selectedItem);
        // Update the results data with the updated item
        updateResultsData(selectedItem);
    }, [itemId]);

    // Function to update the views count in the resultsData array
    const updateResultsData = (updatedItem) => {
        const updatedResultsData = resultsData.map(result => {
            if (result.id === updatedItem.id) {
                return updatedItem;
            } else {
                return result;
            }
        });
    };

    // Function to format the post date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    if (!item) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* First Block */}
            <View style={styles.firstBlock}>
                <Image source={require('../assets/ads2.jpg')} style={styles.image} resizeMode="cover" />
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{`${item.views} views | ${formatDate(item.datePublished)}`}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>

            {/* Second Block */}
            <View style={styles.secondBlock}>
                <Text style={styles.specificationTitle}>Specifications:</Text>
                {/* Render specification details here */}
                {Object.entries(item.specifications).map(([key, value]) => (
                    <View key={key} style={styles.specificationItem}>
                        <Text style={styles.specificationLabel}>{key}: </Text>
                        <Text>{value}</Text>
                    </View>
                ))}
            </View>

            {/* Third Block */}
            <View style={styles.thirdBlock}>
                <TouchableOpacity style={[styles.button, styles.callNowButton]}>
                    <View style={styles.buttonContent}>
                        <Ionicons name="call" size={24} color="white" />
                        <Text style={styles.buttonText}>Call Now</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.whatsappButton]}>
                    <View style={styles.buttonContent}>
                        <Ionicons name="logo-whatsapp" size={24} color="white" />
                        <Text style={styles.buttonText}>WhatsApp</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.chatButton]}>
                    <View style={styles.buttonContent}>
                        <Ionicons name="chatbubbles" size={24} color="white" />
                        <Text style={[styles.buttonText, styles.chatButtonText]}>Chat</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    firstBlock: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
    },
    infoContainer: {
        padding: 10,
    },
    infoText: {
        color: 'gray',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
    },
    price: {
        fontSize: 16,
        marginTop: 5,
    },
    secondBlock: {
        marginBottom: 20,
    },
    specificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    specificationItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    specificationLabel: {
        fontWeight: 'bold',
    },
    thirdBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        marginLeft: 5
    },
    callNowButton: {
        backgroundColor: '#1c8efe',
    },
    whatsappButton: {
        backgroundColor: '#10b680',
    },
    chatButton: {
        backgroundColor: '#10518d',
    },
    chatButtonText: {
        fontSize: 14,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default DetailsScreen;
