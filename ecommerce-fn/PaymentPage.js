import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import config from './config';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome

const PaymentPage = ({ route }) => {
  const { totalAmount, userId } = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const states = [
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { label: 'Assam', value: 'Assam' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Chhattisgarh', value: 'Chhattisgarh' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
    { label: 'Jharkhand', value: 'Jharkhand' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Kerala', value: 'Kerala' },
    { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Manipur', value: 'Manipur' },
    { label: 'Meghalaya', value: 'Meghalaya' },
    { label: 'Mizoram', value: 'Mizoram' },
    { label: 'Nagaland', value: 'Nagaland' },
    { label: 'Odisha', value: 'Odisha' },
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Sikkim', value: 'Sikkim' },
    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    { label: 'Telangana', value: 'Telangana' },
    { label: 'Tripura', value: 'Tripura' },
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'West Bengal', value: 'West Bengal' },
    { label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands' },
    { label: 'Chandigarh', value: 'Chandigarh' },
    { label: 'Dadra and Nagar Haveli', value: 'Dadra and Nagar Haveli' },
    { label: 'Daman and Diu', value: 'Daman and Diu' },
    { label: 'Lakshadweep', value: 'Lakshadweep' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Puducherry', value: 'Puducherry' },
    { label: 'Ladakh', value: 'Ladakh' },
    { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
  ];

  const handlePayment = async () => {
    const totalAmountNum = parseFloat(totalAmount);
    
    if (!name || !address || !city || !state || !zip || !phoneNumber || isNaN(totalAmountNum)) {
      Alert.alert('Error', 'Please fill in all the fields and ensure totalAmount is a valid number.');
      return;
    }
  
    if (!paymentMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }
  
    setLoading(true);
  
    const paymentData = {
      userid: userId,
      phoneNumber,
      totalAmount: totalAmountNum,
      address: {
        name,
        addressLine: address,
        city,
        state,
        zip,
      },
      paymentMethod,
    };
   
    console.log('Payment Data:', paymentData);
    try {
      const response = await axios.post(`${config.BASE_URL}/pay`, paymentData);
      console.log('Payment Response:', response.data);
      setLoading(false);
      if (response.data.success) {
        Alert.alert('Success', 'Payment details saved successfully.');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to save payment details.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Payment Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Payment Details</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#aaa" // Placeholder color
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>State</Text>
        <RNPickerSelect
          onValueChange={(value) => setState(value)}
          items={states}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a state', value: null }}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your zip code"
          value={zip}
          onChangeText={setZip}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Payment Method</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, paymentMethod === 'cod' && styles.radioSelected]}
            onPress={() => setPaymentMethod('cod')}
          >
            <Icon name="money" size={24} color={paymentMethod === 'cod' ? 'red' : 'silver'} />
            <Text style={styles.radioText}>Cash on Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.radioButton, paymentMethod === 'upi' && styles.radioSelected]}
            onPress={() => setPaymentMethod('upi')}
          >
            <Icon name="credit-card" size={24} color={paymentMethod === 'upi' ? 'red' : 'silver'} />
            <Text style={styles.radioText}>UPI Payment</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.paymentButton}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.paymentButtonText}>Proceed to Pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#000', // Black background
  },
  container: {
    padding: 20,
    backgroundColor: '#222', // Darker shade for the container
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'silver', // Silver color for header
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'silver', // Silver color for labels
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'silver', // Silver border
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#333', // Darker input background
    color: 'white', // White text color
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#444', // Slightly darker when selected
  },
  radioText: {
    marginLeft: 8,
    color: 'silver', // Silver color for radio text
  },
  paymentButton: {
    backgroundColor: 'red', // Red button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

// Styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'silver', // Silver border
    borderRadius: 4,
    color: 'white', // White text
    backgroundColor: '#333', // Darker background
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'silver', // Silver border
    borderRadius: 4,
    color: 'white', // White text
    backgroundColor: '#333', // Darker background
  },
  iconContainer: {
    top: 20,
    right: 12,
  },
});

export default PaymentPage;
