import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/Colors';

const TRANSACTIONS = [
    { id: '1', type: 'Credit', amount: '+ AED 500.00', date: 'Oct 24, 10:30 AM', icon: 'add-circle-outline', color: '#4CAF50' },
    { id: '2', type: 'Payment', amount: '- AED 35.00', date: 'Oct 23, 2:15 PM', icon: 'remove-circle-outline', color: '#F44336' },
    { id: '3', type: 'Payment', amount: '- AED 28.50', date: 'Oct 22, 9:00 AM', icon: 'remove-circle-outline', color: '#F44336' },
];

export default function WalletScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <Text style={styles.title}>Wallet</Text>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.cardLabel}>Total Balance</Text>
                        <Text style={styles.cardAmount}>AED 436.50</Text>
                    </View>
                    <View style={styles.cardIcon}>
                        <Ionicons name="wallet" size={32} color="#fff" />
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Ionicons name="add" size={24} color={Colors.text} />
                        </View>
                        <Text style={styles.actionText}>Top Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Ionicons name="card-outline" size={24} color={Colors.text} />
                        </View>
                        <Text style={styles.actionText}>Cards</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Ionicons name="receipt-outline" size={24} color={Colors.text} />
                        </View>
                        <Text style={styles.actionText}>History</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Transactions</Text>

                {TRANSACTIONS.map((item) => (
                    <View key={item.id} style={styles.transactionItem}>
                        <View style={styles.transactionLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                                <Ionicons name={item.icon as any} size={24} color={item.color} />
                            </View>
                            <View>
                                <Text style={styles.transactionType}>{item.type}</Text>
                                <Text style={styles.transactionDate}>{item.date}</Text>
                            </View>
                        </View>
                        <Text style={[
                            styles.transactionAmount,
                            { color: item.type === 'Credit' ? '#4CAF50' : Colors.text }
                        ]}>
                            {item.amount}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    title: {
        fontFamily: Fonts.black,
        fontSize: 32,
        color: Colors.text,
    },
    cardContainer: {
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    card: {
        backgroundColor: '#11181C',
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        height: 160,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    cardLabel: {
        fontFamily: Fonts.medium,
        color: '#rgba(255,255,255,0.6)',
        fontSize: 14,
        marginBottom: 8,
    },
    cardAmount: {
        fontFamily: Fonts.bold,
        color: '#fff',
        fontSize: 36,
    },
    cardIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: Colors.text,
    },
    section: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: Colors.text,
        marginBottom: 16,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionType: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: Colors.text,
        marginBottom: 4,
    },
    transactionDate: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: '#888',
    },
    transactionAmount: {
        fontFamily: Fonts.bold,
        fontSize: 16,
    },
});
