
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import {
    useAddSavedAddressMutation,
    useDeleteSavedAddressMutation,
    useGetSavedAddressesQuery,
} from '../../../Redux/api/userApi';
import { Colors } from '../../../constants/Colors';

type SavedAddress = {
    _id: string;
    label?: string;
    addressLine: string;
};

export default function AddressBookScreen() {
    const router = useRouter();
    const { data, isLoading } = useGetSavedAddressesQuery(undefined);
    const [addSavedAddress, { isLoading: isAdding }] = useAddSavedAddressMutation();
    const [deleteSavedAddress] = useDeleteSavedAddressMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [label, setLabel] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const addresses: SavedAddress[] = data?.data ?? [];

    const handleDelete = (id: string) => {
        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteSavedAddress(id).unwrap();
                        } catch (error: any) {
                            Alert.alert('Error', error?.data?.message || 'Could not delete address');
                        }
                    }
                }
            ]
        );
    };

    const handleAddAddress = async () => {
        if (!addressLine.trim()) {
            Alert.alert('Error', 'Please enter an address.');
            return;
        }

        try {
            await addSavedAddress({
                label: label.trim() || 'Saved Address',
                addressLine: addressLine.trim(),
                latitude: 0,
                longitude: 0,
            }).unwrap();
            setLabel('');
            setAddressLine('');
            setIsModalVisible(false);
        } catch (error: any) {
            Alert.alert('Error', error?.data?.message || 'Could not save address');
        }
    };

    const getAddressIcon = (addressLabel?: string) => {
        const normalized = addressLabel?.toLowerCase() || '';
        if (normalized.includes('home')) return 'home';
        if (normalized.includes('office') || normalized.includes('work')) return 'briefcase';
        return 'location';
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
                <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                    <Ionicons name="add" size={24} color={Colors.primaryDark} />
                </TouchableOpacity>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {isLoading && (
                    <Text style={styles.loadingText}>Loading saved addresses...</Text>
                )}

                {addresses.map((item, index) => (
                    <Animated.View
                        key={item._id}
                        entering={FadeInDown.delay(200 + index * 100).duration(600)}
                        style={styles.addressCard}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name={getAddressIcon(item.label) as any} size={24} color={Colors.primaryDark} />
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressName}>{item.label || 'Saved Address'}</Text>
                            <Text style={styles.addressText}>{item.addressLine}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
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

            <Modal
                visible={isModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Address</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Label</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Home, Office, Gym..."
                            placeholderTextColor="#999"
                            value={label}
                            onChangeText={setLabel}
                        />

                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            style={[styles.input, styles.addressInput]}
                            placeholder="Enter full address"
                            placeholderTextColor="#999"
                            value={addressLine}
                            onChangeText={setAddressLine}
                            multiline
                            textAlignVertical="top"
                        />

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleAddAddress}
                            disabled={isAdding}
                        >
                            <Text style={styles.saveButtonText}>
                                {isAdding ? 'Saving...' : 'Save Address'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    loadingText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 15,
        color: Colors.text,
        marginBottom: 16,
    },
    addressInput: {
        minHeight: 96,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        borderRadius: 18,
        paddingVertical: 16,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '800',
    },
});
