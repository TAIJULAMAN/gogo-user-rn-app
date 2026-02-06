import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, Layout, SlideInRight } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Checkout', 'Payment'];

export default function CreateOrderScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [currentStep, setCurrentStep] = useState(0);

    const renderStepper = () => (
        <View style={styles.stepperContainer}>
            {STEPS.map((step, index) => (
                <React.Fragment key={index}>
                    <View style={styles.stepItem}>
                        <Animated.View
                            style={[
                                styles.stepCircle,
                                index <= currentStep ? styles.stepActive : styles.stepInactive
                            ]}
                            layout={Layout.springify()}
                        >
                            <Text style={[
                                styles.stepNumber,
                                index <= currentStep && { color: '#000' }
                            ]}>{index + 1}</Text>
                        </Animated.View>
                        <Text style={[
                            styles.stepLabel,
                            index <= currentStep ? styles.stepLabelActive : styles.stepLabelInactive
                        ]}>{step}</Text>
                    </View>
                    {index < STEPS.length - 1 && (
                        <View style={styles.stepLineContainer}>
                            <Animated.View
                                style={[
                                    styles.stepLineFill,
                                    { width: index < currentStep ? '100%' : '0%' }
                                ]}
                            />
                        </View>
                    )}
                </React.Fragment>
            ))}
        </View>
    );

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
                <Text style={styles.headerTitle}>Create Order</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <View style={styles.card}>
                {renderStepper()}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                    <Animated.View entering={FadeInDown.delay(300).duration(600)}>
                        <Text style={styles.sectionTitle}>Delivery location</Text>
                        <Text style={styles.sectionSubtitle}>Choose where to pick up & Drop</Text>

                        {/* Location Inputs */}
                        <View style={styles.locationContainer}>
                            {/* Location Inputs with Custom Icons */}
                            <View style={styles.inputsWrapper}>
                                {/* Pickup Input */}
                                <View style={styles.locationInputCard}>
                                    <View style={styles.locationIconWrapper}>
                                        <View style={styles.pickupIconContainer}>
                                            <View style={styles.pickupDot} />
                                            <View style={styles.pickupRing} />
                                        </View>
                                    </View>
                                    <View style={styles.inputContent}>
                                        <Text style={styles.inputLabel}>Pickup Location</Text>
                                        <TouchableOpacity
                                            style={styles.inputTouchable}
                                            onPress={() => router.push('/(user)/user/pickup-location')}
                                        >
                                            <Text style={[
                                                styles.inputText,
                                                !pickup && styles.inputPlaceholder
                                            ]}>
                                                {pickup || 'Choose pickup location'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.locationButton}
                                        onPress={() => router.push('/(user)/user/pickup-location')}
                                    >
                                        <Ionicons name="chevron-forward" size={20} color="#999" />
                                    </TouchableOpacity>
                                </View>

                                {/* Connecting Line */}
                                <View style={styles.connectionLine}>
                                    <View style={styles.dashedLine} />
                                </View>

                                {/* Dropoff Input */}
                                <View style={styles.locationInputCard}>
                                    <View style={styles.locationIconWrapper}>
                                        <View style={styles.dropoffIconContainer}>
                                            <View style={styles.dropoffPin}>
                                                <View style={styles.dropoffDot} />
                                            </View>
                                            <View style={styles.dropoffTail} />
                                        </View>
                                    </View>
                                    <View style={styles.inputContent}>
                                        <Text style={styles.inputLabel}>Dropoff Location</Text>
                                        <TouchableOpacity
                                            style={styles.inputTouchable}
                                            onPress={() => router.push('/(user)/user/drop-location')}
                                        >
                                            <Text style={[
                                                styles.inputText,
                                                !dropoff && styles.inputPlaceholder
                                            ]}>
                                                {dropoff || 'Choose dropoff location'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.locationButton}
                                        onPress={() => router.push('/(user)/user/drop-location')}
                                    >
                                        <Ionicons name="chevron-forward" size={20} color="#999" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Saved Addresses */}
                    <Animated.View
                        entering={FadeInDown.delay(500).duration(600)}
                        style={styles.savedAddressesContainer}
                    >
                        <Text style={styles.sectionTitle}>Saved Locations</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
                            {[
                                { name: 'Home', address: 'JVC, Dubai', icon: 'home' },
                                { name: 'Office', address: 'Business Bay', icon: 'briefcase' },
                                { name: 'Gym', address: 'Sports City', icon: 'fitness' },
                                { name: 'Friend', address: 'Meadows', icon: 'heart' },
                            ].map((item, index) => (
                                <TouchableOpacity key={index} style={styles.savedCard}>
                                    <View style={styles.savedIconContainer}>
                                        <Ionicons name={item.icon as any} size={22} color={Colors.primaryDark} />
                                    </View>
                                    <Text style={styles.savedName}>{item.name}</Text>
                                    <Text style={styles.savedAddress}>{item.address}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    {/* Recent Drops */}
                    <Animated.View
                        entering={FadeInDown.delay(700).duration(600)}
                        style={styles.recentDropsContainer}
                    >
                        <Text style={styles.sectionTitle}>Recent Drops</Text>
                        {[
                            { name: 'Jasani LLC', address: 'Building A, JVC, Dubai' },
                            { name: 'Rashed Al Shamsi Advertising', address: 'Office 305, Bay Square' },
                            { name: 'FitRepublik', address: 'Sports City, Dubai' },
                        ].map((item, index) => (
                            <TouchableOpacity key={index} style={styles.recentDropItem}>
                                <View style={styles.iconContainer}>
                                    <View style={styles.locationPin}>
                                        <View style={styles.locationPinDot} />
                                    </View>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.recentDropName}>{item.name}</Text>
                                    <Text style={styles.recentDropAddress}>{item.address}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#E0E0E0" />
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                </ScrollView>

                {/* Floating Continue Button */}
                <Animated.View
                    entering={SlideInRight.delay(900)}
                    style={styles.floatingButtonContainer}
                >
                    <TouchableOpacity
                        style={styles.continueButton}
                        activeOpacity={0.8}
                        onPress={() => router.push('/(user)/user/vehicle-selection')}
                    >
                        <Text style={styles.continueButtonText}>Continue to Vehicle</Text>
                        <Ionicons name="arrow-forward" size={24} color="#000" />
                    </TouchableOpacity>
                </Animated.View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary, // Using primary for the top background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 32,
        overflow: 'hidden',
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    stepItem: {
        alignItems: 'center',
        zIndex: 1,
        width: 60,
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    stepActive: {
        backgroundColor: Colors.primary,
        borderWidth: 0,
    },
    stepInactive: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#999',
    },
    stepLabel: {
        fontSize: 11,
        color: '#999',
        fontWeight: '600',
        textAlign: 'center',
    },
    stepLabelActive: {
        color: Colors.text,
    },
    stepLabelInactive: {
        color: '#ccc',
    },
    stepLineContainer: {
        flex: 1,
        height: 2, // Thicker line
        backgroundColor: '#F0F0F0',
        marginTop: 15,
        marginHorizontal: -10, // Pull line to connect circles
    },
    stepLineFill: {
        height: '100%',
        backgroundColor: Colors.primary,
    },

    // Form Styling
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#999',
        marginBottom: 24,
    },
    locationContainer: {
        marginBottom: 8,
    },
    inputsWrapper: {
        flex: 1,
    },

    // New Location Input Card Styles
    locationInputCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    locationIconWrapper: {
        marginRight: 12,
    },

    // Pickup Icon Styles
    pickupIconContainer: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    pickupDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.primaryDark,
        position: 'absolute',
        zIndex: 2,
    },
    pickupRing: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.primaryDark,
        position: 'absolute',
        zIndex: 1,
    },

    // Dropoff Icon Styles
    dropoffIconContainer: {
        width: 32,
        height: 38,
        alignItems: 'center',
        position: 'relative',
    },
    dropoffPin: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F44336',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropoffDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    dropoffTail: {
        width: 4,
        height: 12,
        backgroundColor: '#F44336',
        position: 'absolute',
        bottom: 0,
        left: 10,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },

    // Input Content Styles
    inputContent: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 11,
        color: '#999',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    inputTouchable: {
        paddingVertical: 2,
    },
    inputText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
    inputPlaceholder: {
        color: '#999',
        fontWeight: '500',
    },
    locationButton: {
        padding: 8,
        marginLeft: 8,
    },

    // Connection Line
    connectionLine: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    dashedLine: {
        width: 2,
        height: '100%',
        backgroundColor: '#E0E0E0',
        marginLeft: 28,
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginVertical: 24,
    },

    // Saved Addresses
    savedAddressesContainer: {
        marginBottom: 24,
    },
    hScroll: {
        paddingVertical: 10,
        gap: 12,
    },
    savedCard: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginRight: 4,
    },
    savedIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F0FFF0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    savedName: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    savedAddress: {
        fontSize: 10,
        color: '#999',
    },

    // Recent Drops
    recentDropsContainer: {
        marginBottom: 20,
    },
    recentDropItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    iconContainer: {
        marginRight: 16,
    },
    locationPin: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationPinDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#999',
    },
    textContainer: {
        flex: 1,
    },
    recentDropName: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 2,
    },
    recentDropAddress: {
        fontSize: 13,
        color: '#999',
    },

    // Floating Button
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    },
    continueButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
        gap: 8,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#000',
    },
});
