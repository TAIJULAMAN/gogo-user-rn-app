import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Checkout', 'Payment'];

export default function AddStopsScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0); // Locations is active in design
    const [stops, setStops] = useState<{ id: string; address: string }[]>([]);

    const handleAddStop = () => {
        setStops([...stops, { id: Date.now().toString(), address: '' }]);
    };

    const handleRemoveStop = (id: string) => {
        setStops(stops.filter(s => s.id !== id));
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

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Journey Details Card */}
                    <View style={styles.journeyCard}>
                        {/* Header */}
                        <View style={styles.journeyHeader}>
                            <Text style={styles.journeyTitle}>Journey Details</Text>
                            <Text style={styles.journeySubtitle}>From Pickup to Drop off</Text>
                        </View>

                        {/* Content */}
                        <View style={styles.journeyContent}>
                            {/* Pickup Location */}
                            <View style={styles.locationRow}>
                                <Image
                                    source={require('../../../assets/pick.png')}
                                    style={{ width: 24, height: 24, marginRight: 12 }}
                                    resizeMode="contain"
                                />
                                <View style={styles.locationInfo}>
                                    <Text style={styles.locationPerson}>Roshan Hegde • +971552239345</Text>
                                    <Text style={styles.locationAddress} numberOfLines={1}>3401, Escape Tower, Business Bay, Dubai.</Text>
                                </View>
                                <Ionicons name="menu" size={20} color="#999" style={styles.dragIcon} />
                            </View>

                            {/* Dotted Line */}
                            <View style={styles.verticalLineContainer}>
                                <View style={styles.verticalLine} />
                            </View>

                            {/* Initial Drop Location (Fixed as Stop 1) */}
                            <View style={styles.locationRow}>
                                <View style={[styles.timelineDot, styles.dotRed]}>
                                    <Text style={styles.dotText}>1</Text>
                                </View>
                                <View style={styles.locationInfo}>
                                    <Text style={styles.locationPerson}>Roshan Hegde • +971552239345</Text>
                                    <Text style={styles.locationAddress} numberOfLines={1}>1609, Elite 8 Sports Residence, Dubai Sports Cit...</Text>
                                </View>
                                <Ionicons name="menu" size={20} color="#999" style={styles.dragIcon} />
                            </View>

                            {/* Dynamic Stops */}
                            {stops.map((stop, index) => (
                                <View key={stop.id}>
                                    {/* Dotted Line */}
                                    <View style={styles.verticalLineContainer}>
                                        <View style={styles.verticalLine} />
                                    </View>

                                    <View style={styles.locationRow}>
                                        <View style={[styles.timelineDot, styles.dotRed]}>
                                            <Text style={styles.dotText}>{index + 2}</Text>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.stopInput}
                                                placeholder="Click to add stop"
                                                placeholderTextColor="#999"
                                                autoFocus={true}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => handleRemoveStop(stop.id)}>
                                            <Ionicons name="close-circle" size={20} color="#999" style={styles.dragIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}

                        </View>

                        {/* Add Stop Button */}
                        <TouchableOpacity style={styles.addStopButton} onPress={handleAddStop}>
                            <Ionicons name="add-circle-outline" size={18} color="#333" />
                            <Text style={styles.addStopButtonText}>Add Stop</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Map Placeholder */}
                    <View style={styles.mapContainer}>
                        <Image
                            source={require('../../../assets/images/map-placeholder.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>

                    <TouchableOpacity style={[styles.continueButton, { backgroundColor: '#BEFFB6' }]} onPress={() => router.push('/(tab)/user/vehicle-selection')}>
                        <Text style={styles.continueButtonText}>Continue to Vehicle</Text>
                    </TouchableOpacity>

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
        flex: 1,
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
        fontSize: 10,
        color: '#999',
        fontWeight: '500',
        textAlign: 'center',
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
        marginHorizontal: 0,
        marginTop: 14,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        height: 1,
    },

    // Journey Card
    journeyCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 20,
        overflow: 'hidden',
    },
    journeyHeader: {
        padding: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    journeyTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 2,
    },
    journeySubtitle: {
        fontSize: 12,
        color: '#999',
    },
    journeyContent: {
        padding: 16,
        paddingBottom: 10,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timelineDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#fff',
        marginRight: 12,
    },
    dotGreen: {
        borderColor: '#00E676', // Bright Green
    },
    dotRed: {
        borderColor: '#FF3D00', // Bright Red
    },
    dotText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#333',
    },
    locationInfo: {
        flex: 1,
    },
    locationPerson: {
        fontSize: 11,
        color: '#7f8c8d',
        marginBottom: 2,
    },
    locationAddress: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2C3E50',
    },
    dragIcon: {
        marginLeft: 8,
    },
    verticalLineContainer: {
        alignItems: 'flex-start',
        paddingLeft: 11, // Center line under dot (24/2 - 1)
        height: 20,
        justifyContent: 'center',
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#333',
        borderStyle: 'dashed',
        borderWidth: 0.5,
    },

    inputContainer: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    stopInput: {
        fontSize: 13,
        color: '#333',
        outlineWidth: 0,
    },

    addStopButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BEFFB6',
        paddingVertical: 12,
        gap: 6,
    },
    addStopButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    mapContainer: {
        height: 300,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#EEE',
    },

    continueButton: {
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
