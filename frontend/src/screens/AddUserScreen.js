// src/screens/AddUserScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { BASE_URL } from '../config';
import * as Yup from 'yup'; 

// Basic validation schema 
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
});

const AddUserScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        
        try {
            await validationSchema.validate({ name, email, phone }, { abortEarly: false });
        } catch (validationErrors) {
            setLoading(false);
            Alert.alert('Validation Error', validationErrors.errors.join('\n'));
            return;
        }
        

        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                Alert.alert('Success', data.message || 'User added!');
                
                setName('');
                setEmail('');
                setPhone('');
                navigation.navigate('UserList');
            } else {
                
                Alert.alert('Error', data.message || 'Failed to add user. Check console.');
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            Alert.alert('Network Error', 'Could not connect to the backend server.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New User</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone (10 digits)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                maxLength={10}
            />
            <Button
                title={loading ? 'Submitting...' : 'Submit'}
                onPress={handleSubmit}
                disabled={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, backgroundColor: '#f0f0f0' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});

export default AddUserScreen;