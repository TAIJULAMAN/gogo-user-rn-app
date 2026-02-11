import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import InvoiceModal from '../../../components/InvoiceModal';
import { DropoffIcon, PickupIcon } from '../../../components/LocationIcons';
import { Colors } from '../../../constants/Colors';

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [showInvoice, setShowInvoice] = useState(false);

    // Mock data
    const order = {
        id: id || '1',
        orderId: '#ORD-2023-1001',
        status: 'Delivered',
        date: 'Oct 24, 2023',
        time: '10:30 AM',
        from: 'Dubai Mall, Downtown Dubai',
        fromDetails: 'Building A, Floor 2, Shop 205',
        to: 'Marina Towers, Dubai Marina',
        toDetails: 'Tower B, Apartment 1504',
        price: 'AED 35.00',
        vehicle: 'Bike Delivery',
        driver: {
            name: 'Ahmed Hassan',
            phone: '+971 50 123 4567',
            rating: 4.8,
        },
        timeline: [
            { status: 'Order Placed', time: '10:00 AM', completed: true },
            { status: 'Driver Assigned', time: '10:05 AM', completed: true },
            { status: 'Picked Up', time: '10:15 AM', completed: true },
            { status: 'In Transit', time: '10:20 AM', completed: true },
            { status: 'Delivered', time: '10:30 AM', completed: true },
        ],
        breakdown: [
            { label: 'Delivery Fee', amount: 'AED 30.00' },
            { label: 'Service Fee', amount: 'AED 3.50' },
            { label: 'Tax', amount: 'AED 1.50' },
        ],
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'Delivered':
                return { bg: '#E8F5E9', text: '#2E7D32', icon: 'checkmark-circle' as const };
            case 'In Transit':
                return { bg: '#E3F2FD', text: '#1565C0', icon: 'bicycle' as const };
            case 'Cancelled':
                return { bg: '#FFEBEE', text: '#C62828', icon: 'close-circle' as const };
            default:
                return { bg: '#F5F5F5', text: '#616161', icon: 'time' as const };
        }
    };

    const statusConfig = getStatusConfig(order.status);

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
                <Text style={styles.headerTitle}>Order Details</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Status Card */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(600)}
                    style={styles.statusCard}
                >
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                        <Ionicons name={statusConfig.icon} size={24} color={statusConfig.text} />
                        <Text style={[styles.statusText, { color: statusConfig.text }]}>
                            {order.status}
                        </Text>
                    </View>
                    <Text style={styles.orderId}>{order.orderId}</Text>
                    <Text style={styles.orderDate}>{order.date} at {order.time}</Text>
                </Animated.View>

                {/* Locations */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(600)}
                    style={styles.card}
                >
                    <Text style={styles.cardTitle}>Delivery Route</Text>

                    <View style={styles.locationContainer}>
                        <View style={styles.locationRow}>
                            <PickupIcon size={24} />
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.locationLabel}>Pickup Location</Text>
                                <Text style={styles.locationText}>{order.from}</Text>
                                <Text style={styles.locationDetails}>{order.fromDetails}</Text>
                            </View>
                        </View>

                        <View style={styles.connector} />

                        <View style={styles.locationRow}>
                            <DropoffIcon size={24} />
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.locationLabel}>Dropoff Location</Text>
                                <Text style={styles.locationText}>{order.to}</Text>
                                <Text style={styles.locationDetails}>{order.toDetails}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Driver Info */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(600)}
                    style={styles.card}
                >
                    <Text style={styles.cardTitle}>Driver Information</Text>

                    <View style={styles.driverContainer}>
                        <View style={styles.driverAvatar}>
                            <Ionicons name="person" size={32} color={Colors.primaryDark} />
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>{order.driver.name}</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={14} color="#FFB800" />
                                <Text style={styles.ratingText}>{order.driver.rating}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.callButton}>
                            <Ionicons name="call" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Price Breakdown */}
                <Animated.View
                    entering={FadeInDown.delay(600).duration(600)}
                    style={styles.card}
                >
                    <Text style={styles.cardTitle}>Price Breakdown</Text>

                    {order.breakdown.map((item, index) => (
                        <View key={index} style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>{item.label}</Text>
                            <Text style={styles.breakdownAmount}>{item.amount}</Text>
                        </View>
                    ))}

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalAmount}>{order.price}</Text>
                    </View>
                </Animated.View>

                {/* Actions */}
                <Animated.View
                    entering={FadeInDown.delay(700).duration(600)}
                    style={styles.actionsContainer}
                >
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setShowInvoice(true)}
                    >
                        <Ionicons name="receipt-outline" size={20} color={Colors.text} />
                        <Text style={styles.actionButtonText}>Download Receipt</Text>
                    </TouchableOpacity>

                    {order.status === 'Delivered' && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.actionButtonPrimary]}
                            onPress={() => router.push('/(user)/user/rate-driver')}
                        >
                            <Ionicons name="star-outline" size={20} color={Colors.text} />
                            <Text style={styles.actionButtonText}>Rate Driver</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>
            </ScrollView>

            <InvoiceModal
                visible={showInvoice}
                onClose={() => setShowInvoice(false)}
                order={order}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#f8f9fa',
    },
    backButton: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 0,
    },
    statusCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 24,
        gap: 8,
        marginBottom: 12,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '700',
    },
    orderId: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 14,
        color: '#999',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 16,
    },
    locationContainer: {
        gap: 0,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    locationTextContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    locationText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    locationDetails: {
        fontSize: 14,
        color: '#666',
    },
    connector: {
        height: 20,
        width: 2,
        backgroundColor: '#E0E0E0',
        marginLeft: 11,
        marginVertical: 8,
    },
    driverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    driverAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F0FFF0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    callButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeline: {
        gap: 0,
    },
    timelineItem: {
        flexDirection: 'row',
        gap: 16,
    },
    timelineLeft: {
        alignItems: 'center',
    },
    timelineDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timelineDotCompleted: {
        backgroundColor: Colors.primaryDark,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 4,
    },
    timelineLineCompleted: {
        backgroundColor: Colors.primary,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: 20,
    },
    timelineStatus: {
        fontSize: 15,
        fontWeight: '600',
        color: '#999',
        marginBottom: 2,
    },
    timelineStatusCompleted: {
        color: Colors.text,
    },
    timelineTime: {
        fontSize: 13,
        color: '#999',
    },
    breakdownRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    breakdownLabel: {
        fontSize: 15,
        color: '#666',
    },
    breakdownAmount: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#fff',
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    actionButtonPrimary: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    actionButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
    },
});
