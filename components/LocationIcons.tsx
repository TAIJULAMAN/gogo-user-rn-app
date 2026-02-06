import React from 'react';
import { StyleSheet, View } from 'react-native';

export const PickupIcon = ({ size = 24 }: { size?: number }) => (
    <View style={[styles.pickupContainer, { width: size, height: size }]}>
        <View style={[styles.pickupDot, { width: size * 0.4, height: size * 0.4 }]} />
        <View style={[styles.pickupRing, { width: size * 0.7, height: size * 0.7 }]} />
    </View>
);

export const DropoffIcon = ({ size = 24 }: { size?: number }) => (
    <View style={[styles.dropoffContainer, { width: size, height: size * 1.2 }]}>
        <View style={[styles.dropoffPin, {
            width: size,
            height: size,
            borderRadius: size / 2,
        }]}>
            <View style={[styles.dropoffDot, {
                width: size * 0.35,
                height: size * 0.35,
                borderRadius: size * 0.175,
            }]} />
        </View>
        <View style={[styles.dropoffTail, {
            width: size * 0.15,
            height: size * 0.4,
            left: size * 0.425,
        }]} />
    </View>
);

const styles = StyleSheet.create({
    // Pickup Icon (Concentric circles)
    pickupContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    pickupDot: {
        backgroundColor: '#4CAF50',
        borderRadius: 100,
        position: 'absolute',
    },
    pickupRing: {
        borderWidth: 2,
        borderColor: '#4CAF50',
        borderRadius: 100,
        backgroundColor: 'transparent',
        position: 'absolute',
    },

    // Dropoff Icon (Map pin)
    dropoffContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    dropoffPin: {
        backgroundColor: '#F44336',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    dropoffDot: {
        backgroundColor: '#fff',
    },
    dropoffTail: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F44336',
        transform: [{ rotate: '45deg' }],
    },
});
