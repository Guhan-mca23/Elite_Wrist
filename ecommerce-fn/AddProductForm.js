import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from './config';
import { FontAwesome } from '@expo/vector-icons';

const AddProductForm = () => {
    const navigation = useNavigation();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    const handleAddProduct = async () => {
        try {
            const newProduct = {
                name: productName,
                description,
                price,
                ingredients,
                benefits,
                image,
            };

            const response = await axios.post(`${config.BASE_URL}/products`, newProduct); 
            Alert.alert('Product Added!', `Product Name: ${response.data.name}`);
            navigation.navigate('AdminProductManagement');
        } catch (error) {
            Alert.alert('Error', 'There was an issue adding the product.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
                placeholderTextColor="#FF4136" 
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#FF4136" 
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#FF4136" 
            />
            <TextInput
                style={styles.input}
                placeholder="category"
                value={ingredients}
                onChangeText={setIngredients}
                placeholderTextColor="#FF4136" 
            />
            <TextInput
                style={styles.input}
                placeholder="color"
                value={benefits}
                onChangeText={setBenefits}
                placeholderTextColor="#FF4136" 
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
                placeholderTextColor="#FF4136" 
            />

            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                <FontAwesome name="plus-circle" size={20} color="white" />
                <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'black', // Black background for contrast
    },
    input: {
        height: 40,
        borderColor: 'silver', // Silver border color
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        color: 'white', // White text color for inputs
    },
    button: {
        backgroundColor: '#FF4136', // Red button background
        padding: 15,
        borderRadius: 10,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: 'white', // White text color for button
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10, // Space between icon and text
    },
});

export default AddProductForm;
