import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Checkout', 'Payment'];

export default function CheckoutScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(2);

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
                <Text style={styles.headerTitle}>CHECKOUT</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.card}>
                {renderStepper()}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                    {/* Order Summary */}
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryCard}>
                        {/* Vehicle Info */}
                        <View style={styles.vehicleRow}>
                            <Image source={require('../../../assets/vehicles/car.png')} style={styles.vehicleImage} resizeMode="contain" />
                            <View style={styles.vehicleInfo}>
                                <Text style={styles.vehicleName}>Car Delivery</Text>
                                <Text style={styles.vehicleDetails}>Just 7 mins away</Text>
                            </View>
                            <Text style={styles.priceText}>$39.82</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Route Info */}
                        <View style={styles.routeRow}>
                            <View style={styles.routePoint}>
                                <View style={[styles.dot, styles.dotGreen]} />
                                <Text style={styles.routeText} numberOfLines={1}>3401, Escape Tower, Business Bay</Text>
                            </View>
                            <View style={styles.routeLine} />
                            <View style={styles.routePoint}>
                                <View style={[styles.dot, styles.dotRed]} />
                                <Text style={styles.routeText} numberOfLines={1}>1609, Elite 8 Sports Residence</Text>
                            </View>
                        </View>
                    </View>

                    {/* Total */}
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>$39.82</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.payButton, { backgroundColor: '#BEFFB6' }]}
                        onPress={() => router.push('/(tab)/user/payment')}
                    >
                        <Text style={styles.payButtonText}>Continue to Payment</Text>
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

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 12,
        marginTop: 8,
    },

    // Summary Card
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 16,
        marginBottom: 24,
    },
    vehicleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleImage: {
        width: 60,
        height: 40,
        marginRight: 12,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    vehicleDetails: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
    },
    routeRow: {
        gap: 8,
    },
    routePoint: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    dotGreen: {
        backgroundColor: '#00E676',
    },
    dotRed: {
        backgroundColor: '#FF3D00',
    },
    routeText: {
        fontSize: 12,
        color: '#666',
        flex: 1,
    },
    routeLine: {
        width: 1,
        height: 10,
        backgroundColor: '#DDD',
        marginLeft: 3.5,
    },

    // Total
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 16,
        color: '#666',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#333',
    },

    payButton: {
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    payButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
