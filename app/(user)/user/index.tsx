import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const VEHICLES = [
    { id: 'bike', name: 'Bike Delivery', icon: 'motorcycle' },
    { id: 'car', name: 'Car Delivery', icon: 'car-side' },
    { id: 'truck', name: 'Truck Delivery', icon: 'truck' },
];

const FEATURES = [
    'Any Size.',
    'Any Quantity.',
    'Any Emirates.',
    'Multiple Stops.',
    'Delivered in Minutes.',
];

export default function HomeScreen() {
    const router = useRouter();
    const [selectedVehicle, setSelectedVehicle] = React.useState('car');

    return (
        <ScrollView style={styles.container}>
            <View style={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>

                    <View style={styles.userSection}>
                        <View style={styles.avatar}>
                            <Image
                                source={require('../../../assets/avatar.jpg')}
                                style={styles.avatarImage}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.company}>Md Shah Aman </Text>
                            <View style={styles.userRoleBadge}>
                                <Text style={styles.userRole}>User</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Vehicle Selection Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Choose your rider</Text>

                    <View style={styles.vehicleContainer}>
                        {VEHICLES.map((vehicle) => (
                            <TouchableOpacity
                                key={vehicle.id}
                                style={[
                                    styles.vehicleButton,
                                    selectedVehicle === vehicle.id && styles.vehicleButtonActive
                                ]}
                                onPress={() => {
                                    setSelectedVehicle(vehicle.id);
                                    router.push('/(user)/user/create-order');
                                }}
                            >
                                <View style={[
                                    styles.vehicleIconContainer,
                                    selectedVehicle === vehicle.id && styles.vehicleIconContainerActive
                                ]}>
                                    <FontAwesome5
                                        name={vehicle.icon}
                                        size={32}
                                        color={selectedVehicle === vehicle.id ? '#000' : '#666'}
                                    />
                                </View>
                                <Text style={[
                                    styles.vehicleName,
                                    selectedVehicle === vehicle.id && styles.vehicleNameActive
                                ]}>
                                    {vehicle.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Features List */}
                    <View style={styles.featuresContainer}>
                        {FEATURES.map((feature, index) => (
                            <Text key={index} style={styles.featureText}>{feature}</Text>
                        ))}
                    </View>

                    {/* Dubai Skyline */}
                    <View style={styles.skylineContainer}>
                        <Image
                            source={require('../../../assets/Dubai.png')}
                            style={styles.skylineImage}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    scrollContent: {
        paddingBottom: 0,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 10,
    },
    logo: {
        fontSize: 48,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 20,
    },
    greeting: {
        fontSize: 20,
        fontWeight: '400',
        color: '#2C3E50',
        marginBottom: 8,
    },
    company: {
        fontSize: 32,
        fontWeight: '800',
        color: '#2C3E50',
        lineHeight: 38,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarImage: {
        width: 56,
        height: 56,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    userInfo: {
        flex: 1,
    },
    userRoleBadge: {
        alignSelf: 'flex-start',
        marginTop: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    userRole: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 24,
    },
    vehicleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        gap: 12,
    },
    vehicleButton: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
    },
    vehicleButtonActive: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary,
    },
    vehicleIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    vehicleIconContainerActive: {
        backgroundColor: '#fff',
    },
    vehicleName: {
        fontSize: 10,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 7,
    },
    vehicleNameActive: {
        color: '#2C3E50',
        fontWeight: '700',
    },
    featuresContainer: {
        marginBottom: 32,
    },
    featureText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#2C3E50',
        marginBottom: 8,
        lineHeight: 28,
    },
    skylineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    skylineImage: {
        width: '100%',
        height: 180,
        resizeMode: 'contain',
    },
});
