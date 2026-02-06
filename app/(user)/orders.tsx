import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/Colors';

const MOCK_ORDERS = [
    {
        id: '1',
        status: 'Delivered',
        date: 'Oct 24, 2023 • 10:30 AM',
        from: 'Dubai Mall',
        to: 'Marina Towers',
        price: 'AED 35.00',
        items: 'Electronics',
    },
    {
        id: '2',
        status: 'In Transit',
        date: 'Today • 2:15 PM',
        from: 'Business Bay',
        to: 'JLT Cluster V',
        price: 'AED 28.50',
        items: 'Documents',
    },
    {
        id: '3',
        status: 'Cancelled',
        date: 'Oct 20, 2023 • 09:00 AM',
        from: 'Deira City Center',
        to: 'Al Barsha 1',
        price: 'AED 42.00',
        items: 'Gifts',
    }
];

export default function OrdersScreen() {
    const renderOrder = ({ item }: { item: typeof MOCK_ORDERS[0] }) => (
        <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                    <Text style={[styles.statusText, getStatusTextStyle(item.status)]}>{item.status}</Text>
                </View>
                <Text style={styles.price}>{item.price}</Text>
            </View>

            <View style={styles.locationContainer}>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={16} color={Colors.icon} />
                    <Text style={styles.locationText}>{item.from}</Text>
                </View>
                <View style={styles.connector} />
                <View style={styles.locationRow}>
                    <Ionicons name="flag-outline" size={16} color={Colors.icon} />
                    <Text style={styles.locationText}>{item.to}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.items}>{item.items}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
            </View>

            <FlatList
                data={MOCK_ORDERS}
                renderItem={renderOrder}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Delivered': return { backgroundColor: '#E8F5E9' };
        case 'In Transit': return { backgroundColor: '#E3F2FD' };
        case 'Cancelled': return { backgroundColor: '#FFEBEE' };
        default: return { backgroundColor: '#F5F5F5' };
    }
};

const getStatusTextStyle = (status: string) => {
    switch (status) {
        case 'Delivered': return { color: '#2E7D32' };
        case 'In Transit': return { color: '#1565C0' };
        case 'Cancelled': return { color: '#C62828' };
        default: return { color: '#616161' };
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    title: {
        fontFamily: Fonts.black,
        fontSize: 32,
        color: Colors.text,
    },
    listContent: {
        padding: 24,
        gap: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
    },
    price: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: Colors.text,
    },
    locationContainer: {
        gap: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: Colors.text,
    },
    connector: {
        height: 12,
        width: 1,
        backgroundColor: '#E0E0E0',
        marginLeft: 7.5,
        marginVertical: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: '#888',
    },
    items: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: Colors.text,
    },
});
