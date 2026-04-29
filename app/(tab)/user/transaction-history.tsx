import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

const ALL_TRANSACTIONS = [
    { id: '1', type: 'Payment', desc: 'Order #ORD-2023-1001', amount: '- AED 35.00', date: 'Oct 24, 2023', time: '10:30 AM', icon: 'remove-circle-outline', color: '#F44336' },
    { id: '2', type: 'Payment', desc: 'Order #ORD-2023-1002', amount: '- AED 28.50', date: 'Oct 23, 2023', time: '2:15 PM', icon: 'remove-circle-outline', color: '#F44336' },
    { id: '3', type: 'Refund', desc: 'Order #ORD-2023-1003 Cancelled', amount: '+ AED 42.00', date: 'Oct 22, 2023', time: '9:00 AM', icon: 'add-circle-outline', color: '#4CAF50' },
    { id: '4', type: 'Payment', desc: 'Order #ORD-2023-1004', amount: '- AED 52.00', date: 'Oct 21, 2023', time: '4:45 PM', icon: 'remove-circle-outline', color: '#F44336' },
    { id: '5', type: 'Payment', desc: 'Order #ORD-2023-1005', amount: '- AED 18.50', date: 'Oct 20, 2023', time: '11:20 AM', icon: 'remove-circle-outline', color: '#F44336' },
    { id: '6', type: 'Refund', desc: 'Order #ORD-2023-1006 Cancelled', amount: '+ AED 25.00', date: 'Oct 19, 2023', time: '3:10 PM', icon: 'add-circle-outline', color: '#4CAF50' },
];

const FILTERS = ['All', 'Payments', 'Refunds'];

export default function TransactionHistoryScreen() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filteredTransactions = ALL_TRANSACTIONS.filter(transaction => {
        if (selectedFilter === 'All') return true;
        if (selectedFilter === 'Payments') return transaction.type === 'Payment';
        if (selectedFilter === 'Refunds') return transaction.type === 'Refund';
        return true;
    });

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
                <Text style={styles.headerTitle}>Transaction History</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            {/* Filters */}
            <Animated.View
                entering={FadeInDown.delay(200).duration(600)}
                style={styles.filtersContainer}
            >
                {FILTERS.map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            styles.filterButton,
                            selectedFilter === filter && styles.filterButtonActive
                        ]}
                        onPress={() => setSelectedFilter(filter)}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.filterText,
                            selectedFilter === filter && styles.filterTextActive
                        ]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {filteredTransactions.map((item, index) => (
                    <Animated.View
                        key={item.id}
                        entering={FadeInDown.delay(300 + index * 50).duration(600)}
                    >
                        <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
                            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                                <Ionicons name={item.icon as any} size={24} color={item.color} />
                            </View>

                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionType}>{item.type}</Text>
                                <Text style={styles.transactionDesc}>{item.desc}</Text>
                                <Text style={styles.transactionDate}>{item.date} • {item.time}</Text>
                            </View>

                            <Text style={[
                                styles.transactionAmount,
                                { color: item.type === 'Refund' ? '#4CAF50' : Colors.text }
                            ]}>
                                {item.amount}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}

                {filteredTransactions.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="receipt-outline" size={80} color="#E0E0E0" />
                        <Text style={styles.emptyTitle}>No Transactions</Text>
                        <Text style={styles.emptyMessage}>
                            No transactions found for this filter
                        </Text>
                    </View>
                )}
            </ScrollView>
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
    filtersContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    filterButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#999',
    },
    filterTextActive: {
        color: '#000',
    },
    scrollContent: {
        padding: 24,
        paddingTop: 0,
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionType: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    transactionDesc: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    transactionDate: {
        fontSize: 12,
        color: '#999',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '800',
        marginLeft: 12,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.text,
        marginTop: 24,
        marginBottom: 8,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 40,
    },
});
