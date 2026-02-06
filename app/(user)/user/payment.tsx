import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import { PaymentSuccessModal } from '../../../components/PaymentSuccessModal';
import { Colors } from '../../../constants/Colors';

const STEPS = ['Locations', 'Vehicle', 'Checkout', 'Payment'];

const PAYMENT_METHODS = [
    { id: 'wallet', name: 'Wallet', balance: '$240.50', icon: 'wallet-outline' },
    { id: 'cash', name: 'Cash on Delivery', balance: null, icon: 'cash-outline' },
];

export default function PaymentScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(3);
    const [selectedMethod, setSelectedMethod] = useState('wallet');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handlePayment = () => {
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        router.replace('/(user)/orders');
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
                <Text style={styles.headerTitle}>Payment</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <View style={styles.card}>
                {renderStepper()}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Payment Methods */}
                    <Animated.View entering={FadeInDown.delay(300).duration(600)}>
                        <Text style={styles.sectionTitle}>Select Payment Method</Text>
                        <View style={styles.methodsContainer}>
                            {PAYMENT_METHODS.map((method) => (
                                <TouchableOpacity
                                    key={method.id}
                                    style={[
                                        styles.methodCard,
                                        selectedMethod === method.id && styles.methodCardSelected
                                    ]}
                                    onPress={() => setSelectedMethod(method.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.methodIcon,
                                        selectedMethod === method.id && styles.methodIconSelected
                                    ]}>
                                        <Ionicons
                                            name={method.icon as any}
                                            size={28}
                                            color={selectedMethod === method.id ? Colors.primaryDark : '#999'}
                                        />
                                    </View>
                                    <View style={styles.methodInfo}>
                                        <Text style={[
                                            styles.methodName,
                                            selectedMethod === method.id && styles.methodNameSelected
                                        ]}>{method.name}</Text>
                                        {method.balance && (
                                            <Text style={styles.methodBalance}>Balance: {method.balance}</Text>
                                        )}
                                    </View>
                                    <View style={styles.radioContainer}>
                                        {selectedMethod === method.id ? (
                                            <View style={styles.radioSelected}>
                                                <View style={styles.radioDot} />
                                            </View>
                                        ) : (
                                            <View style={styles.radioUnselected} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Order Summary */}
                    <Animated.View entering={FadeInDown.delay(500).duration(600)}>
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>$35.00</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Service Fee</Text>
                                <Text style={styles.summaryValue}>$3.50</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Tax</Text>
                                <Text style={styles.summaryValue}>$1.32</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.summaryRow}>
                                <Text style={styles.totalLabel}>Total Amount</Text>
                                <Text style={styles.totalValue}>$39.82</Text>
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(700).duration(600)}>
                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={handlePayment}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.payButtonText}>Pay $39.82</Text>
                            <Ionicons name="arrow-forward" size={24} color="#000" />
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </View>

            <PaymentSuccessModal
                visible={showSuccessModal}
                onClose={handleCloseModal}
                amount="$39.82"
            />
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 16,
    },
    methodsContainer: {
        gap: 12,
        marginBottom: 32,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        backgroundColor: '#FAFAFA',
    },
    methodCardSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#F0FFF0',
    },
    methodIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    methodIconSelected: {
        backgroundColor: '#fff',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    methodInfo: {
        flex: 1,
    },
    methodName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#666',
        marginBottom: 2,
    },
    methodNameSelected: {
        color: Colors.text,
    },
    methodBalance: {
        fontSize: 13,
        color: '#999',
    },
    radioContainer: {
        marginLeft: 8,
    },
    radioSelected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.primary,
    },
    radioUnselected: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
    },
    summaryCard: {
        backgroundColor: '#F9F9F9',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#666',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.text,
    },
    payButton: {
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
    payButtonText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000',
    },
});
