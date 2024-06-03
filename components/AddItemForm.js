// AddItemForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddItemForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');

    const handleSubmit = () => {
        const newItem = {
            title,
            price,
            details
        };
        onSubmit(newItem);
    };

    return (
        <View style={styles.container}>
            <Text>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Text>Price:</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
            />
            <Text>Details:</Text>
            <TextInput
                style={styles.input}
                value={details}
                onChangeText={setDetails}
            />
            <Button title="Add Item" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default AddItemForm;
