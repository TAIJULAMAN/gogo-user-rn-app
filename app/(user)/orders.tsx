import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { DropoffIcon, PickupIcon } from '../../components/LocationIcons';
import { Colors } from '../../constants/Colors';

const MOCK_ORDERS = [
    {
        id: '1',
        status: 'Delivered',
        date: 'Oct 24, 2023',
        time: '10:30 AM',
        from: 'Dubai Mall, Downtown',
        to: 'Marina Towers, Dubai Marina',
        price: 'AED 35.00',
        vehicle: 'Bike',
        orderId: '#ORD-2023-1001',
    },
    {
        id: '2',
        status: 'In Transit',
        date: 'Today',
        time: '2:15 PM',
        from: 'Business Bay, Tower A',
        to: 'JLT Cluster V, Office 305',
        price: 'AED 28.50',
        vehicle: 'Car',
        orderId: '#ORD-2023-1002',
    },
    {
        id: '3',
        status: 'Cancelled',
        date: 'Oct 20, 2023',
        time: '09:00 AM',
        from: 'Deira City Center',
        to: 'Al Barsha 1, Villa 23',
        price: 'AED 42.00',
        vehicle: 'Truck',
        orderId: '#ORD-2023-1003',
    },
];

const getStatusConfig = (status: string) => {
    switch (status) {
        case 'Delivered':
            return {
                bg: '#E8F5E9',
                text: '#2E7D32',
                icon: 'checkmark-circle' as const
            };
        case 'In Transit':
            return {
                bg: '#E3F2FD',
                text: '#1565C0',
                icon: 'bicycle' as const
            };
        case 'Cancelled':
            return {
                bg: '#FFEBEE',
                text: '#C62828',
                icon: 'close-circle' as const
            };
        default:
            return {
                bg: '#F5F5F5',
                text: '#616161',
                icon: 'time' as const
            };
    }
};

export default function OrdersScreen() {
    const router = useRouter();

    const renderOrder = (item: typeof MOCK_ORDERS[0], index: number) => {
        const statusConfig = getStatusConfig(item.status);

        return (
            <Animated.View
                key={item.id}
                entering={FadeInDown.delay(index * 100).duration(600)}
            >
                <TouchableOpacity
                    style={styles.orderCard}
                    onPress={() => router.push(`/(user)/user/order-details?id=${item.id}`)}
                    activeOpacity={0.7}
                >
                    {/* Header */}
                    <View style={styles.orderHeader}>
                        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                            <Ionicons name={statusConfig.icon} size={16} color={statusConfig.text} />
                            <Text style={[styles.statusText, { color: statusConfig.text }]}>
                                {item.status}
                            </Text>
                        </View>
                        <Text style={styles.orderId}>{item.orderId}</Text>
                    </View>

                    {/* Locations */}
                    <View style={styles.locationContainer}>
                        <View style={styles.locationRow}>
                            <PickupIcon size={20} />
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.locationLabel}>Pickup</Text>
                                <Text style={styles.locationText} numberOfLines={1}>
                                    {item.from}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.connector} />

                        <View style={styles.locationRow}>
                            <DropoffIcon size={20} />
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.locationLabel}>Dropoff</Text>
                                <Text style={styles.locationText} numberOfLines={1}>
                                    {item.to}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerLeft}>
                            <Ionicons name="calendar-outline" size={14} color="#999" />
                            <Text style={styles.dateText}>{item.date} • {item.time}</Text>
                        </View>
                        <View style={styles.footerRight}>
                            <View style={styles.vehicleBadge}>
                                <Ionicons name="car-outline" size={12} color={Colors.primaryDark} />
                                <Text style={styles.vehicleText}>{item.vehicle}</Text>
                            </View>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
                <Text style={styles.subtitle}>{MOCK_ORDERS.length} orders in total</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            >
                {MOCK_ORDERS.map((item, index) => renderOrder(item, index))}
            </ScrollView>
        </View>
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
        fontSize: 32,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
    },
    listContent: {
        padding: 24,
        paddingTop: 0,
        gap: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '700',
    },
    orderId: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
    },
    locationContainer: {
        marginBottom: 16,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    locationTextContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 11,
        color: '#999',
        fontWeight: '600',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
    },
    connector: {
        height: 16,
        width: 2,
        backgroundColor: '#E0E0E0',
        marginLeft: 9,
        marginVertical: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateText: {
        fontSize: 12,
        color: '#999',
    },
    footerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    vehicleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F0FFF0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    vehicleText: {
        fontSize: 11,
        fontWeight: '600',
        color: Colors.primaryDark,
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: Colors.text,
    },
});
