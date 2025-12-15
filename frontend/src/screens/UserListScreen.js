// src/screens/UserListScreen.js

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { BASE_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';

const UserListScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button 
                    onPress={() => navigation.navigate('AddUser')} 
                    title="Add User"
                    color="#007bff" 
                />
            ),
        });
    }, [navigation]);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/users`);
            const data = await response.json();
            
            if (response.ok) {
                setUsers(data);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError('Network error: Could not reach server.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

   
    useFocusEffect(
        useCallback(() => {
            fetchUsers();
            // Cleanup function (optional)
            return () => {}; 
        }, [])
    );
    

    const handleDelete = async (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/users/${id}`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                Alert.alert('Success', 'User deleted!');
                                
                                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                            } else {
                                const data = await response.json();
                                Alert.alert('Error', data.message || 'Failed to delete user.');
                            }
                        } catch (error) {
                            Alert.alert('Network Error', 'Could not connect to the backend.');
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const renderUser = ({ item }) => (
        <View style={styles.card}>
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>Email: {item.email}</Text>
                <Text style={styles.detail}>Phone: {item.phone}</Text>
            </View>
            <Button 
                title="Delete" 
                onPress={() => handleDelete(item._id)} 
                color="#e74c3c"
            />
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (users.length === 0) {
        return <Text style={styles.emptyText}>No users found. Add one now!</Text>;
    }

    return (
        <FlatList
            data={users}
            keyExtractor={item => item._id}
            renderItem={renderUser}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: { padding: 10, backgroundColor: '#f9f9f9' },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    name: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
    detail: { fontSize: 14, color: '#555' },
    errorText: { color: 'red', textAlign: 'center', marginTop: 50 },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#777' },
});

export default UserListScreen;