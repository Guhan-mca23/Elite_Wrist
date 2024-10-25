import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config';
import { FontAwesome } from '@expo/vector-icons';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products`);
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleUpdateProduct = (productId) => {
        navigation.navigate('UpdateProductForm', { productId });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Text style={styles.productText}>{item.name}</Text>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => handleUpdateProduct(item._id)}
                        >
                            <FontAwesome name="pencil" size={20} color="white" />
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: 'black', // Added black background
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'silver', // Changed border color to silver
    },
    productText: {
        fontSize: 18,
        color: 'white', // Changed text color to white
    },
    button: {
        backgroundColor: '#FF4136', // Red button background
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white', // White text color for button
        fontSize: 16,
        marginLeft: 5, // Space between icon and text
    },
});

export default ProductList;
