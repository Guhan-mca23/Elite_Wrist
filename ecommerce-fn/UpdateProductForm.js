import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import config from './config';
import { FontAwesome } from '@expo/vector-icons';

const UpdateProductForm = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { productId } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products/${productId}`);
                const product = await response.json();

                if (response.ok) {
                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price.toString());
                    setIngredients(product.ingredients.join(', '));
                    setBenefits(product.benefits.join(', '));
                    setImage(product.image);
                } else {
                    throw new Error('Failed to fetch product');
                }
            } catch (error) {
                Alert.alert('Error', 'Could not fetch product details');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleUpdateProduct = async () => {
        const updatedProduct = {
            name,
            description,
            price: parseFloat(price),
            ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
            benefits: benefits.split(',').map((benefit) => benefit.trim()),
            image,
        };

        try {
            const response = await fetch(`${config.BASE_URL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                Alert.alert('Success', 'Product updated successfully!');
                navigation.navigate('ProductList'); 
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            Alert.alert('Error', 'Could not update product');
        }
    };

    return (
        <View style={styles.container}>
            <InputWithIcon 
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
                icon="tag"
            />
            <InputWithIcon 
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                icon="info-circle"
            />
            <InputWithIcon 
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                icon="dollar"
            />
            <InputWithIcon 
                placeholder="Category"
                value={ingredients}
                onChangeText={setIngredients}
                icon="list"
            />
            <InputWithIcon 
                placeholder="Color"
                value={benefits}
                onChangeText={setBenefits}
                icon="paint-brush"
            />
            <InputWithIcon 
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
                icon="image"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
                <Text style={styles.buttonText}>Update Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const InputWithIcon = ({ placeholder, value, onChangeText, icon, keyboardType }) => (
    <View style={styles.inputContainer}>
        <FontAwesome name={icon} size={20} color="silver" style={styles.icon} />
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black', // Black background
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'silver',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        backgroundColor: 'black',
    },
    input: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
        color: 'white', // White text
    },
    icon: {
        padding: 10,
    },
    button: {
        backgroundColor: '#FF4136', // Red button background
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // White text color for button
        fontSize: 16,
    },
});

export default UpdateProductForm;
