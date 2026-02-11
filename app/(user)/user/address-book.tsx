
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

const MOCK_ADDRESSES = [
    { id: '1', name: 'Home', address: 'Apartment 4B, JVC, Dubai', type: 'home' },
    { id: '2', name: 'Office', address: 'Office 305, Bay Square, Business Bay', type: 'briefcase' },
    { id: '3', name: 'Gym', address: 'FitRepublik, Sports City', type: 'fitness' },
];

export default function AddressBookScreen() {
    const router = useRouter();
    const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => setAddresses(prev => prev.filter(addr => addr.id !== id))
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <Animated.View
                entering={FadeInUp.delay(100).duration(600)}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Addresses</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => Alert.alert("Add Address", "Feature to add address would open here.")}>
                    <Ionicons name="add" size={24} color={Colors.primaryDark} />
                </TouchableOpacity>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {addresses.map((item, index) => (
                    <Animated.View
                        key={item.id}
                        entering={FadeInDown.delay(200 + index * 100).duration(600)}
                        style={styles.addressCard}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name={item.type as any} size={24} color={Colors.primaryDark} />
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressName}>{item.name}</Text>
                            <Text style={styles.addressText}>{item.address}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                            <Ionicons name="trash-outline" size={20} color="#FF5252" />
                        </TouchableOpacity>
                    </Animated.View>
                ))}

                {addresses.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="location-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>No saved addresses yet</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    addButton: {
        padding: 8,
    },
    content: {
        padding: 20,
        paddingTop: 10,
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F0FFF0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    addressInfo: {
        flex: 1,
    },
    addressName: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    deleteButton: {
        padding: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        gap: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '600',
    }
});
