import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import config from './config';

const ProductDetail = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // Fetch product details from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddReview = () => {
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview('');
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₹{product.price ? product.price.toFixed(2) : 'N/A'}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Category</Text>
        {product.ingredients && product.ingredients.length > 0 ? (
          product.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.detailText}>{ingredient}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No Category available.</Text>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Tags</Text>
        {product.benefits && product.benefits.length > 0 ? (
          product.benefits.map((benefit, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.detailText}>{benefit}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No benefits available.</Text>
        )}
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.sectionTitle}>Add a Review</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review..."
          value={review}
          onChangeText={setReview}
        />
        <TouchableOpacity style={styles.reviewButton} onPress={handleAddReview}>
          <Text style={styles.reviewButtonText}>Submit Review</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {reviews.length > 0 ? (
          reviews.map((item, index) => (
            <Text key={index} style={styles.reviewText}>
              {item}
            </Text>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  productContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#C0C0C0', // Silver border
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#1C1C1C', // Dark background for product details
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C0C0C0', // Silver border around image
  },
  productName: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: '#FF0000' }, // Red
  productPrice: { fontSize: 20, color: '#C0C0C0' }, // Silver
  productDescription: { fontSize: 16, marginVertical: 10, color: '#FFFFFF' }, // White
  detailsContainer: { marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#FF0000' }, // Red
  detailText: { fontSize: 16, marginVertical: 2, color: '#C0C0C0' }, // Silver
  reviewContainer: { marginTop: 10 },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Silver border
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    color: '#FFFFFF', // White text for input
  },
  reviewButton: { backgroundColor: 'red', padding: 10, borderRadius: 5,marginBottom:10 },
  reviewButtonText: { color: '#fff', textAlign: 'center' },
  reviewText: { marginVertical: 5, color: '#FFFFFF' }, // White
  noReviewsText: { color: '#888' },
  noDataText: { color: '#C0C0C0', fontStyle: 'italic' }, // Silver and italic for no data message
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#FFFFFF' }, // White
  row: {
    backgroundColor: '#2E2E2E', // Darker background for rows
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: '#C0C0C0', // Silver border around each row
  },
});

export default ProductDetail;
