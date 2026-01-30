import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Payment'];

const VEHICLES = [
    {
        id: 'bike',
        name: 'Bike Delivery',
        weight: '20Kg',
        time: 'Just 8 mins away',
        price: '32.90',
        image: require('../../../assets/vehicles/bike.png'),
        colors: ['#00E5FF', '#2979FF'] as const,
        icon: 'bicycle'
    },
    {
        id: 'car',
        name: 'Car Delivery',
        weight: '1050Kg',
        time: 'Just 7 mins away',
        price: '39.82',
        image: require('../../../assets/vehicles/car.png'),
        colors: ['#00B0FF', '#0091EA'] as const,
        icon: 'car'
    },
    {
        id: 'truck',
        name: 'Truck Delivery',
        weight: '3510Kg',
        time: 'Just 7 mins away',
        price: '59.82',
        image: require('../../../assets/vehicles/truck.png'),
        colors: ['#2962FF', '#0091EA'] as const,
        icon: 'bus'
    }
];

export default function VehicleSelectionScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

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
                        <View style={styles.journeyHeader}>
                            <Text style={styles.journeyTitle}>Journey Details</Text>
                            <Text style={styles.journeySubtitle}>From Pickup to Drop off</Text>
                        </View>

                        <View style={styles.journeyContent}>
                            <View style={styles.timelineContainer}>
                                <View style={[styles.timelineDot, styles.dotGreen]}>
                                    <Text style={styles.dotText}>A</Text>
                                </View>
                                <View style={styles.timelineLine} />
                                <View style={[styles.timelineDot, styles.dotRed]}>
                                    <Text style={styles.dotText}>B</Text>
                                </View>
                            </View>

                            <View style={styles.locationsWrapper}>
                                <View style={styles.locationItem}>
                                    <Text style={styles.locationPerson}>Roshan Hegde • +971552239345</Text>
                                    <Text style={styles.locationAddress} numberOfLines={1}>3401, Escape Tower, Business Bay, Dubai.</Text>
                                </View>
                                <View style={{ height: 24 }} />
                                <View style={styles.locationItem}>
                                    <Text style={styles.locationPerson}>Roshan Hegde • +971552239345</Text>
                                    <Text style={styles.locationAddress} numberOfLines={1}>1609, Elite 8 Sports Residence, Dubai Sports City, D...</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.swapButton}>
                                <Ionicons name="swap-vertical" size={16} color="#333" />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.journeyActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="add-circle-outline" size={18} color="#333" />
                                <Text style={styles.actionButtonText}>Add Stop</Text>
                            </TouchableOpacity>
                            <View style={styles.actionDivider} />
                            <TouchableOpacity style={styles.actionButton}>
                                <MaterialIcons name="edit" size={18} color="#333" />
                                <Text style={styles.actionButtonText}>Edit Location</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Vehicle Selection */}
                    <Text style={styles.sectionTitle}>Choose your rider</Text>

                    <View style={styles.vehicleList}>
                        {VEHICLES.map((vehicle) => (
                            <TouchableOpacity
                                key={vehicle.id}
                                onPress={() => setSelectedVehicle(vehicle.id)}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={vehicle.colors as any}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[
                                        styles.vehicleCard,
                                        selectedVehicle === vehicle.id && styles.vehicleCardSelected
                                    ]}
                                >
                                    <View style={styles.vehicleImageContainer}>
                                        <Image source={vehicle.image} style={styles.vehicleImage} resizeMode="contain" />
                                    </View>
                                    <View style={styles.vehicleInfo}>
                                        <Text style={styles.vehicleName}>{vehicle.name}</Text>
                                        <Text style={styles.vehicleDetails}>{vehicle.weight} • {vehicle.time}</Text>
                                    </View>
                                    <View style={styles.vehiclePriceContainer}>
                                        <Text style={styles.currencySymbol}>$</Text>
                                        <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity style={[styles.continueButton, { backgroundColor: '#BEFFB6' }]}>
                        <Text style={styles.continueButtonText}>Continue to Payment</Text>
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

    // Journey Card
    journeyCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 24,
        overflow: 'hidden',
    },
    journeyHeader: {
        padding: 16,
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
        flexDirection: 'row',
        padding: 16,
    },
    timelineContainer: {
        alignItems: 'center',
        marginRight: 12,
    },
    timelineDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#fff',
    },
    dotGreen: {
        borderColor: '#00E676', // Bright Green
    },
    dotRed: {
        borderColor: '#FF3D00', // Bright Red
    },
    dotText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    timelineLine: {
        width: 1,
        height: 24,
        borderLeftWidth: 1,
        borderColor: '#000',
        borderStyle: 'dashed',
        marginVertical: 4,
    },
    locationsWrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    locationItem: {
        justifyContent: 'center',
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
    swapButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#BEFFB6',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 8,
    },
    journeyActions: {
        flexDirection: 'row',
        backgroundColor: '#BEFFB6',
        paddingVertical: 10,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    actionButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    actionDivider: {
        width: 1,
        backgroundColor: '#A0E0A0',
        height: '100%',
    },

    // Vehicle Selection
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 16,
    },
    vehicleList: {
        gap: 16,
        marginBottom: 24,
    },
    vehicleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 20,
        height: 80,
    },
    vehicleCardSelected: {
        borderWidth: 2,
        borderColor: '#333',
    },
    vehicleImageContainer: {
        width: 80,
        height: 60,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vehicleImage: {
        width: '100%',
        height: '100%',
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    vehicleDetails: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    vehiclePriceContainer: {
        alignItems: 'flex-end',
    },
    currencySymbol: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },
    vehiclePrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },

    continueButton: {
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
});
