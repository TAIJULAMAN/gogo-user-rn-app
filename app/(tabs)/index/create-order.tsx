import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Payment'];

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
                        <View style={[
                            styles.stepCircle,
                            index <= currentStep ? styles.stepActive : styles.stepInactive
                        ]}>
                            <Text style={styles.stepNumber}>{index + 1}</Text>
                        </View>
                        <Text style={[
                            styles.stepLabel,
                            index <= currentStep ? styles.stepLabelActive : styles.stepLabelInactive
                        ]}>{step}</Text>
                    </View>
                    {index < STEPS.length - 1 && (
                        <View style={styles.stepLineContainer} />
                    )}
                </React.Fragment>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>CREATE ORDER</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.card}>
                {renderStepper()}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                    <Text style={styles.sectionTitle}>Delivery location</Text>
                    <Text style={styles.sectionSubtitle}>Choose where to pick up & Drop</Text>

                    {/* Location Inputs */}
                    <View style={styles.locationContainer}>
                        {/* Timeline Line */}
                        <View style={styles.timelineContainer}>
                            <View style={[styles.timelineDot, styles.dotGreen]}>
                                <MaterialIcons name="location-on" size={24} color="#4CAF50" />
                            </View>
                            <View style={styles.timelineLine} />
                            <View style={[styles.timelineDot, styles.dotRed]}>
                                <MaterialIcons name="location-on" size={24} color="#F44336" />
                            </View>
                        </View>

                        {/* Input Fields */}
                        <View style={styles.inputsWrapper}>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Sports City, Dubai"
                                    value={pickup}
                                    onChangeText={setPickup}
                                    placeholderTextColor="#333"
                                />
                                <TouchableOpacity style={styles.targetIcon} onPress={() => router.push('/(tabs)/pickup-location')}>
                                    <MaterialIcons name="my-location" size={20} color="#999" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 12 }} />

                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Type to search or paste location link"
                                    value={dropoff}

                                    onChangeText={setDropoff}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity style={styles.targetIcon} onPress={() => router.push('/(tabs)/drop-location')}>
                                    <MaterialIcons name="my-location" size={20} color="#999" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Saved Addresses */}
                    <View style={styles.savedAddressesContainer}>
                        <Text style={styles.sectionTitle}>Saved Addresses</Text>
                        {[
                            { name: 'Home', address: 'Apartment 402, Building A, JVC, Dubai', icon: 'home-outline' },
                            { name: 'Office', address: 'Office 305, Bay Square, Business Bay', icon: 'briefcase-outline' },
                            { name: 'Gym', address: 'FitRepublik, Sports City, Dubai', icon: 'fitness-outline' },
                            { name: 'Friend House', address: 'Villa 12, Meadows 4, Dubai', icon: 'people-outline' },
                            { name: 'Warehouse', address: 'Al Quoz Industrial Area 3, Dubai', icon: 'business-outline' },
                        ].map((item, index) => (
                            <TouchableOpacity key={index} style={styles.recentDropItem}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.recentDropName}>{item.name}</Text>
                                    <Text style={styles.recentDropAddress}>{item.address}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* Recent Drops */}
                    <View style={styles.recentDropsContainer}>
                        <Text style={styles.sectionTitle}>Recent Drops</Text>
                        {[
                            { name: 'Jasani LLC', address: 'Building A, JVC, Dubai' },
                            { name: 'Rashed Al Shamsi Advertising', address: 'Office 305, Bay Square, Business Bay' },
                            { name: 'Jasani LLC', address: 'FitRepublik, Sports City, Dubai' },
                            { name: 'Rashed Al Shamsi Advertising', address: 'Villa 12, Meadows 4, Dubai' },
                            { name: 'Jasani LLC', address: 'Al Quoz Industrial Area 3, Dubai' },
                        ].map((item, index) => (
                            <TouchableOpacity key={index} style={styles.recentDropItem}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="location-outline" size={20} color={Colors.primary} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.recentDropName}>{item.name}</Text>
                                    <Text style={styles.recentDropAddress}>{item.address}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
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
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#2C3E50',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 30,
        paddingHorizontal: 0,
    },
    stepItem: {
        alignItems: 'center',
        zIndex: 1,
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    stepActive: {
        backgroundColor: Colors.primary,
    },
    stepInactive: {
        backgroundColor: '#E0E0E0',
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    stepLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
    },
    stepLabelActive: {
        color: '#333',
        fontWeight: '700',
    },
    stepLabelInactive: {
        color: '#999',
    },
    stepLineContainer: {
        flex: 1,
        marginHorizontal: 4,
        marginTop: 14,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        height: 1,
    },

    // Form Styling
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20,
    },
    locationContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineContainer: {
        alignItems: 'center',
        marginRight: 12,
        paddingTop: 12,
    },
    timelineDot: {
        width: 24,
        height: 24,
        // borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        backgroundColor: '#fff',
    },
    dotGreen: {
        borderColor: '#4CAF50',
    },
    dotRed: {
        borderColor: '#F44336',
    },
    dotText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    timelineLine: {
        width: 1,
        height: 40,
        borderLeftWidth: 1,
        borderColor: '#000',
        borderStyle: 'dashed',
        borderWidth: 1,
        marginVertical: 4,
    },
    inputsWrapper: {
        flex: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 25,
        paddingHorizontal: 12,
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: '#333',
    },
    targetIcon: {
        padding: 4,
    },

    // Saved Addresses
    savedAddressesContainer: {
        marginBottom: 20,
    },

    // Recent Drops
    recentDropsContainer: {
        marginBottom: 20,
    },
    recentDropsTitle: {
        fontSize: 14,
        color: '#999',
        fontWeight: '600',
        marginBottom: 12,
    },
    recentDropItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    recentDropName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 2,
    },
    recentDropAddress: {
        fontSize: 13,
        color: '#7f8c8d',
        lineHeight: 18,
    },
});
