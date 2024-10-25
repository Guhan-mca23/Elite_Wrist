import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AdminProductManagement = () => {
    const navigation = useNavigation();

    const handleAddProduct = () => {
        navigation.navigate('AddProductForm');
    };

    const handleUpdateProduct = () => {
        navigation.navigate('ProductList');
    };

    const handleDeleteProduct = () => {
        navigation.navigate('DeleteProductForm');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Management</Text>
            <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                <FontAwesome name="plus-circle" size={20} color="white" />
                <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
                <FontAwesome name="edit" size={20} color="white" />
                <Text style={styles.buttonText}>Update Product</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleDeleteProduct}>
                <FontAwesome name="trash" size={20} color="white" />
                <Text style={styles.buttonText}>Delete Product</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'black', // Black background for contrast
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'silver', // Silver title
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#FF4136', // Red button background
        padding: 15,
        borderRadius: 10,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: 'white', // White text color for buttons
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10, // Space between icon and text
    },
});

export default AdminProductManagement;
