import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import { CustomInput } from '../../../components/CustomInput';
import { DropoffIcon } from '../../../components/LocationIcons';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Checkout', 'Payment'];

const RECENT_LOCATIONS = [
    { name: 'Jasani LLC', address: '305, 3rd Floor, Building 3, Bay Square, Business Bay' },
    { name: 'Rashed Al Shamsi Advertising', address: 'Behind Haneefa Supermarket, Diera' },
    { name: 'Nerds Company LLC', address: 'Behind Dubai Garden, Al Quoz' },
    { name: 'Wisam Sign', address: 'Industrial Area 2, Sharjah' },
];

export default function DropoffLocationScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [details, setDetails] = useState('');
    const [personName, setPersonName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSelectLocation = (location: string) => {
        setSearchQuery(location);
        setShowDropdown(false);
    };

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
                <Text style={styles.headerTitle}>Dropoff Location</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <View style={styles.card}>
                {renderStepper()}

                {/* Title Section with Custom Icon */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600)}
                    style={styles.titleSection}
                >
                    <View style={styles.locationIconContainer}>
                        <DropoffIcon size={28} />
                    </View>
                    <View>
                        <Text style={styles.pageTitle}>Dropoff Location</Text>
                        <Text style={styles.pageSubtitle}>Choose where to drop</Text>
                    </View>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(600)}
                    style={[styles.searchContainer, { zIndex: 30 }]}
                >
                    <CustomInput
                        placeholder="Type to search or paste location link"
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        icon={<Ionicons name="search" size={20} color="#999" />}
                    />
                </Animated.View>

                {/* Dropdown */}
                {showDropdown && (
                    <>
                        <TouchableOpacity
                            style={styles.dismissOverlay}
                            activeOpacity={1}
                            onPress={() => setShowDropdown(false)}
                        />
                        <Animated.View
                            entering={FadeInDown.duration(300)}
                            style={styles.dropdownOverlay}
                        >
                            <Text style={styles.recentDropsTitle}>Recent Locations</Text>
                            {RECENT_LOCATIONS.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelectLocation(item.name + ', ' + item.address)}
                                >
                                    <View style={styles.dropdownIconContainer}>
                                        <Ionicons name="location-outline" size={20} color={Colors.primaryDark} />
                                    </View>
                                    <View style={styles.dropdownTextContainer}>
                                        <Text style={styles.dropdownItemName}>{item.name}</Text>
                                        <Text style={styles.dropdownItemAddress} numberOfLines={1}>
                                            {item.address}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </>
                )}

                {/* Scrollable Content */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
                >
                    {/* Map View */}
                    <Animated.View
                        entering={FadeInDown.delay(400).duration(600)}
                        style={styles.mapContainer}
                    >
                        <Image
                            source={require('../../../assets/images/map-placeholder.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                        <View style={styles.mapOverlay}>
                            <DropoffIcon size={40} />
                        </View>
                    </Animated.View>

                    {/* Form */}
                    <Animated.View
                        entering={FadeInDown.delay(500).duration(600)}
                        style={styles.formContainer}
                    >
                        <CustomInput
                            label="Additional Details"
                            placeholder="Landmark, flat no., building name"
                            value={details}
                            onChangeText={setDetails}
                            icon={<Ionicons name="information-circle-outline" size={20} color="#999" />}
                        />

                        <CustomInput
                            label="Contact Person"
                            placeholder="Name of the person"
                            value={personName}
                            onChangeText={setPersonName}
                            icon={<Ionicons name="person-outline" size={20} color="#999" />}
                        />

                        <CustomInput
                            label="Phone Number"
                            placeholder="+971 XX XXX XXXX"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            icon={<Ionicons name="call-outline" size={20} color="#999" />}
                        />

                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={() => router.push('/(user)/user/add-stops')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.continueButtonText}>Continue to Add Stops</Text>
                            <Ionicons name="arrow-forward" size={24} color="#000" />
                        </TouchableOpacity>
                    </Animated.View>
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
        height: 2,
        backgroundColor: '#F0F0F0',
        marginTop: 15,
        marginHorizontal: -10,
    },
    stepLineFill: {
        height: '100%',
        backgroundColor: Colors.primary,
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    locationIconContainer: {
        marginRight: 16,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#999',
    },
    searchContainer: {
        marginBottom: 16,
    },
    mapContainer: {
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 24,
        backgroundColor: '#EEE',
        position: 'relative',
    },
    mapOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -24 }],
    },
    formContainer: {
        gap: 4,
    },
    continueButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        borderRadius: 28,
        gap: 8,
        marginTop: 16,
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
        top: 260,
        left: 24,
        right: 24,
        backgroundColor: '#fff',
        borderRadius: 20,
        zIndex: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
        paddingVertical: 12,
        maxHeight: 300,
    },
    recentDropsTitle: {
        fontSize: 12,
        color: '#999',
        fontWeight: '700',
        paddingHorizontal: 16,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F9F9F9',
    },
    dropdownIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF0F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    dropdownTextContainer: {
        flex: 1,
    },
    dropdownItemName: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    dropdownItemAddress: {
        fontSize: 12,
        color: '#999',
    },
});
