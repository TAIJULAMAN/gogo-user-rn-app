import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
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

const FeatureItem = ({ text, index }: { text: string, index: number }) => (
    <Animated.View
        entering={FadeInDown.delay(600 + (index * 100)).duration(600)}
        style={styles.featureItem}
    >
        <Ionicons name="checkmark-circle" size={20} color={Colors.primaryDark} />
        <Text style={styles.featureText}>{text}</Text>
    </Animated.View>
);

export default function HomeScreen() {
    const router = useRouter();
    const [selectedVehicle, setSelectedVehicle] = useState('car');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Animated.View
                        entering={FadeInUp.delay(200).duration(800)}
                        style={styles.headerContent}
                    >
                        <View style={styles.userInfo}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={require('../../../assets/avatar.jpg')}
                                    style={styles.avatarImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.onlineIndicator} />
                            </View>
                            <View>
                                <Text style={styles.welcomeText}>Welcome back,</Text>
                                <Text style={styles.userName}>Md Shah Aman</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.notificationButton}
                            onPress={() => router.push('/(user)/user/notifications')}
                        >
                            <Ionicons name="notifications-outline" size={24} color="#000" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                {/* Main Content Card */}
                <View style={styles.contentCard}>
                    <Animated.View entering={FadeInDown.delay(400).duration(800)}>
                        <Text style={styles.sectionTitle}>Choose your ride</Text>

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
                                        // router.push('/(user)/user/create-order');
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.vehicleIconContainer,
                                        selectedVehicle === vehicle.id && styles.vehicleIconContainerActive
                                    ]}>
                                        <FontAwesome5
                                            name={vehicle.icon as any}
                                            size={28}
                                            color={selectedVehicle === vehicle.id ? Colors.text : '#999'}
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

                        <TouchableOpacity
                            style={styles.ctaButton}
                            onPress={() => router.push('/(user)/user/create-order')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.ctaButtonText}>Book Now</Text>
                            <Ionicons name="arrow-forward" size={20} color="#000" />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Features List */}
                    <View style={styles.featuresContainer}>
                        <Text style={styles.featuresTitle}>Why choose us?</Text>
                        {FEATURES.map((feature, index) => (
                            <FeatureItem key={index} text={feature} index={index} />
                        ))}
                    </View>

                    {/* Dubai Skyline */}
                    <Animated.View
                        entering={FadeInDown.delay(1000).duration(800)}
                        style={styles.skylineContainer}
                    >
                        <Image
                            source={require('../../../assets/Dubai.png')}
                            style={styles.skylineImage}
                        />
                    </Animated.View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    scrollContent: {
        paddingBottom: 0,
        flexGrow: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    welcomeText: {
        fontSize: 14,
        color: '#2C3E50',
        fontWeight: '500',
        opacity: 0.8,
    },
    userName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#2C3E50',
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF5252',
    },
    contentCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 20,
    },
    vehicleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 12,
    },
    vehicleButton: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        backgroundColor: '#FCFCFC',
    },
    vehicleButtonActive: {
        borderColor: Colors.primary,
        backgroundColor: '#F0FFF0',
        transform: [{ scale: 1.05 }], // Simple scale via style, ideally animated
    },
    vehicleIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    vehicleIconContainerActive: {
        backgroundColor: '#fff',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    vehicleName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#999',
        textAlign: 'center',
    },
    vehicleNameActive: {
        color: Colors.text,
        fontWeight: '700',
    },
    ctaButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 20,
        gap: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 32,
    },
    ctaButtonText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000',
    },
    featuresContainer: {
        marginBottom: 32,
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 12,
    },
    featureText: {
        fontSize: 16,
        color: '#444',
        fontWeight: '500',
    },
    skylineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
    },
    skylineImage: {
        width: '100%',
        height: 180,
        resizeMode: 'contain',
        opacity: 0.8,
    },
});
