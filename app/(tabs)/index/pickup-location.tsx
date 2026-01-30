import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Payment'];

export default function PickupLocationScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelectLocation = (location: string) => {
        setSearchQuery(location);
        setShowDropdown(false);
    };

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

                {/* Pickup Location Title Section */}
                <View style={styles.titleSection}>
                    <View style={styles.locationIconContainer}>
                        <MaterialIcons name="location-on" size={24} color="#4CAF50" />
                    </View>
                    <View>
                        <Text style={styles.pageTitle}>Pickup location</Text>
                        <Text style={styles.pageSubtitle}>Choose where to Pickup</Text>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={[styles.searchContainer, { zIndex: 30 }]}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Type to search or paste whatsapp location link"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                    />
                </View>

                {/* Dismiss Overlay (Transparent) */}
                {showDropdown && (
                    <TouchableOpacity
                        style={styles.dismissOverlay}
                        activeOpacity={1}
                        onPress={() => setShowDropdown(false)}
                    />
                )}

                {/* Search Dropdown*/}
                {showDropdown && (
                    <View style={styles.dropdownOverlay}>
                        <View style={styles.recentDropsSection}>
                            <Text style={styles.recentDropsTitle}>Recent Drops</Text>
                            {[
                                { name: 'Jasani LLC', address: '305, 3rd Floor, Building 3, Bay Square, Business Bay' },
                                { name: 'Rashed Al Shamsi Advertising', address: 'Behind Haneefa Supermarket, Diera,' },
                                { name: 'Rashed Al Shamsi Advertising', address: 'Behind Haneefa Supermarket, Diera,' },
                                { name: 'Nerds Company LLC', address: 'Behind Dubai Garden,Al Quoz' },
                                { name: 'Wisam Sign', address: 'Industrial Area 2, Sharjah' },
                            ].map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelectLocation(item.name + ', ' + item.address)}
                                >
                                    <Text style={styles.dropdownItemName}>{item.name}</Text>
                                    <Text style={styles.dropdownItemAddress}>{item.address}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Scrollable Content (Map + Form) */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}>

                    {/* Map View */}
                    <View style={styles.mapContainer}>
                        <Image
                            source={require('../../../assets/images/map-placeholder.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.inputField}
                            placeholder="More details (landmark, flat no.)"
                            placeholderTextColor="#999"
                        />
                        <TextInput
                            style={styles.inputField}
                            placeholder="Name of the person"
                            placeholderTextColor="#999"
                        />
                        <View style={styles.phoneInputContainer}>
                            <TextInput
                                style={[styles.inputField, { marginBottom: 0 }]}
                                placeholder="+971"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/(tabs)/drop-location')}>
                            <Text style={styles.continueButtonText}>Continue to Drop Location</Text>
                        </TouchableOpacity>
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
        marginBottom: 20,
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

    // Page Title
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationIconContainer: {
        marginRight: 12,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#999',
    },

    searchContainer: {
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    searchInput: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#333',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    mapContainer: {
        height: 250,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#EEE',
    },
    mapPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
    },

    formContainer: {
        gap: 12,
    },
    inputField: {
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#333',
        // @ts-ignore
        outlineWidth: 0,
    },
    phoneInputContainer: {
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: Colors.primary,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    dismissOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 15,
        backgroundColor: 'transparent',
    },
    dropdownOverlay: {
        position: 'absolute',
        top: 240,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        zIndex: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
        paddingBottom: 8,
    },
    dropdownHeaderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    dropdownHeaderText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2C3E50',
    },
    recentDropsSection: {
        paddingTop: 12,
    },
    recentDropsTitle: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F9F9F9',
    },
    dropdownItemName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 2,
    },
    dropdownItemAddress: {
        fontSize: 12,
        color: '#999',
    },
});
