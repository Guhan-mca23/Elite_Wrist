import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';
import { useUser } from './UserContext';
import { useIsFocused } from '@react-navigation/native';

export default function Profile({ navigation }) {
  const { user, setUser } = useUser(); // Access user context
  const [address, setAddress] = useState(null);
  const userId = user?.id; // Get user ID from context
  const isFocused = useIsFocused(); // Detect when screen is in focus
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); // Default image

  // Ensure the profile image updates when the user context changes
  useEffect(() => {
    if (user) {
      setProfileImage(user.profileImage || 'https://via.placeholder.com/150');
    }
  }, [user]);

  // Fetch profile data when the screen is focused
  useEffect(() => {
    if (isFocused) {
      fetchProfile();
    }
  }, [isFocused]);

  const fetchProfile = async () => {
    if (!userId) return; 
    try {
      const response = await axios.get(`${config.BASE_URL}/profile/${userId}`);
      const { username, email, profileImage: newProfileImage, paymentDetails } = response.data;

      const updatedUser = { ...user, username, email, profileImage: newProfileImage };
      setUser(updatedUser);

      if (newProfileImage) {
        setProfileImage(newProfileImage);
      }

      if (paymentDetails && paymentDetails.length > 0) {
        setAddress(paymentDetails[0].address);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load profile data.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null); 
    Alert.alert('Logged out', 'You have been logged out.');
    navigation.replace('SignIn'); // Redirect to SignIn page
  };

  return (
    <View style={styles.container}>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressHeader}>Address:</Text>
          <View style={styles.addressDetailContainer}>
            <Text style={styles.addressText}>{address.name}</Text>
            <Text style={styles.addressText}>{address.addressLine}</Text>
            <Text style={styles.addressText}>{address.city}, {address.state} {address.zip}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center', // Center the image
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Silver border
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#222', // Darker background for profile info
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#C0C0C0', // Silver text for username
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    color: '#C0C0C0', // Silver text for email
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Silver border
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#222', // Darker background for address
  },
  addressHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#C0C0C0', // Silver text for address header
  },
  addressDetailContainer: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Silver border
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#444', // Dark grey background for address details
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#C0C0C0', // Silver text for address details
  },
  button: {
    backgroundColor: '#ff0000', // Red background for buttons
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff', // White text for button
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
