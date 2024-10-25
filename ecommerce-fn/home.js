import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import config from './config';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing Material Icons

export default function HomePage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${config.BASE_URL}/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (text) => {
    setSearchQuery(text);

    if (text === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert('Success', `${item.name} added to cart!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="search" size={24} color="#C0C0C0" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#C0C0C0"
          value={searchQuery}
          onChangeText={handleSearchInputChange}
          returnKeyType="search"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#C0C0C0" />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item._id })}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                ) : (
                  <Text style={styles.noImageText}>No Image Available</Text>
                )}
              </TouchableOpacity>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      )}

      <View style={styles.menuBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart })}>
          <Icon name="shopping-cart" size={24} color="#C0C0C0" />
          <Text style={styles.menuItem}>Cart ({cart.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={24} color="#C0C0C0" />
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
          <Icon name="info" size={24} color="#C0C0C0" />
          <Text style={styles.menuItem}>About Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#C0C0C0', // Silver border
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    color: '#FFFFFF', // White text color
  },
  itemContainer: {
    backgroundColor: 'silver', // White background for item
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000', // Red color for title
  },
  itemDescription: {
    color: '#C0C0C0', // Silver color for description
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#FF0000', // Red color for price
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#FF0000', // Red background
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noImageText: {
    color: '#C0C0C0', // Silver color for no image text
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#C0C0C0', // Silver border
  },
  menuItem: {
    fontSize: 16,
    color: '#C0C0C0', // Silver color
    textAlign: 'center',
  },
});
