import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddItemScreen = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [category, setCategory] = useState('');
    const [specifications, setSpecifications] = useState([]);
    const [image, setImage] = useState(null);

    const handleAddSpecification = () => {
        setSpecifications(prevSpecifications => [...prevSpecifications, { key: '', value: '' }]);
    };

    const handleSpecificationChange = (index, key, value) => {
        const newSpecifications = [...specifications];
        newSpecifications[index] = { key, value };
        setSpecifications(newSpecifications);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={styles.placeholder}>
                        <Text>Select an Image</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Details"
                value={details}
                onChangeText={setDetails}
            />
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
            />

            {specifications.map((specification, index) => (
                <View key={index} style={styles.specificationContainer}>
                    <TextInput
                        style={styles.specificationInput}
                        placeholder="Key"
                        value={specification.key}
                        onChangeText={text => handleSpecificationChange(index, text, specification.value)}
                    />
                    <TextInput
                        style={styles.specificationInput}
                        placeholder="Value"
                        value={specification.value}
                        onChangeText={text => handleSpecificationChange(index, specification.key, text)}
                    />
                </View>
            ))}

            <Button
                title="Add Specification"
                onPress={handleAddSpecification}
            />
            <View style={{marginTop: 10}}>
                <Button
                    title="Add Item"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: Dimensions.get('window').width - 40, // Full width with 20px padding on each side
        height: 200,
        marginBottom: 20,
    },
    placeholder: {
        width: Dimensions.get('window').width - 40, // Full width with 20px padding on each side
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    specificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    specificationInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
});

export default AddItemScreen;
