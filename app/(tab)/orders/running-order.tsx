import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

export default function RunningOrderScreen() {
    const router = useRouter();

    const handleCancelOrder = () => {
        // In a real app, this would trigger a cancellation flow
        router.replace('/user');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Map Section */}
            <Image
                source={require('../../../assets/images/map-placeholder.png')}
                style={styles.mapBackground}
                resizeMode="cover"
            />

            {/* Header - Close Button */}
            <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/user')} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </Animated.View>

            {/* Bottom Content Layer */}
            <View style={styles.bottomContainer}>
                <Animated.View
                    entering={FadeInDown.delay(300).springify().damping(15)}
                    style={styles.cardContainer}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>

                        {/* Arrival Estimate Card */}
                        <LinearGradient
                            colors={['#F0FDF4', '#DCFCE7']} // Light green gradient
                            style={styles.arrivalCard}
                        >
                            <View style={styles.arrivalHeader}>
                                <View>
                                    <Text style={styles.arrivalLabel}>Arrival Estimate</Text>
                                    <Text style={styles.arrivalTime}>8:20 PM - 8:30 PM</Text>
                                    <View style={styles.statusRow}>
                                        <Text style={styles.statusHighlight}>On Time</Text>
                                        <Text style={styles.statusText}> • On the way to you.</Text>
                                    </View>
                                </View>
                                <Image
                                    source={require('../../../assets/vehicles/moto.png')}
                                    style={styles.vehicleImage}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.tipContainer}>
                                <View style={styles.tipHeader}>
                                    <Ionicons name="bulb" size={16} color="#F59E0B" />
                                    <Text style={styles.tipLabel}> Did you know?</Text>
                                </View>
                                <Text style={styles.tipText}>"We optimise routes in real time to save minutes."</Text>
                            </View>
                        </LinearGradient>

                        {/* Driver Info Card */}
                        <View style={styles.driverCard}>
                            <View style={styles.driverInfo}>
                                <View style={styles.avatarContainer}>
                                    {/* Placeholder for driver avatar */}
                                    <Image
                                        source={{ uri: 'https://i.pravatar.cc/150?u=driver' }}
                                        style={styles.avatar}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.driverName}>Shahbaaz Karjikar</Text>
                                    <Text style={styles.driverRole}>Your delivery buddy</Text>
                                </View>
                            </View>
                            <View style={styles.communicationActions}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, { marginLeft: 12 }]}>
                                    <Ionicons name="call" size={24} color="#00C853" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Order Summary */}
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Order Summary</Text>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Total Distance</Text>
                                <Text style={styles.summaryValue}>28km</Text>
                            </View>
                        </View>

                    </ScrollView>
                </Animated.View>

                {/* Cancel Order Button */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={handleCancelOrder} style={styles.cancelButton}>
                        <Ionicons name="close" size={20} color="#FF3D00" />
                        <Text style={styles.cancelButtonText}>Cancel Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    mapBackground: {
        width: '100%',
        height: '45%', // Takes top 45% of screen
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        marginTop: -30, // Overlap the map
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    cardContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    arrivalCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#DCFCE7',
    },
    arrivalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    arrivalLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    arrivalTime: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusHighlight: {
        color: '#16A34A',
        fontWeight: '700',
        fontSize: 14,
    },
    statusText: {
        color: '#4B5563',
        fontSize: 14,
    },
    vehicleImage: {
        width: 80,
        height: 60,
        marginTop: -10,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 16,
    },
    tipContainer: {
        flexDirection: 'column',
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    tipLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    tipText: {
        fontSize: 13,
        color: '#1F2937',
        fontStyle: 'italic',
        lineHeight: 18,
        textAlign: 'center',
        fontWeight: '500',
    },
    driverCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F3F4F6',
        marginRight: 12,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#BEFFB6',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    driverName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 2,
    },
    driverRole: {
        fontSize: 12,
        color: '#6B7280',
    },
    communicationActions: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2937',
    },
    footer: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        alignItems: 'center',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    cancelButtonText: {
        color: '#FF3D00',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});
