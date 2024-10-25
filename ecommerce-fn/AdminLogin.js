import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AdminLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === 'admin@gmail.com' && password === 'admin123') {
            Alert.alert('Login Successful!');
            navigation.navigate('AdminProductManagement'); 
        } else {
            Alert.alert('Invalid credentials, please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Icon as a component */}
            <FontAwesome name="user-secret" size={100} color="#FF4136" />
            <Text style={styles.title}>Admin Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#FF4136"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#FF4136"
            />
            
            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <View style={styles.buttonContent}>
                    <FontAwesome name="sign-in" size={20} color="white" />
                    <Text style={styles.buttonText}>Login</Text>
                </View>
            </TouchableOpacity>

          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'silver',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        maxWidth: 350,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#B2DFDB',
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#FF4136',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    linkText: {
        color: 'silver',
        marginTop: 20,
        fontSize: 16,
    },
});

export default AdminLogin;
