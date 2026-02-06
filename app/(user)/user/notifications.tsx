import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

interface Notification {
    id: string;
    type: 'order' | 'payment' | 'promo' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
}

const NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        type: 'order',
        title: 'Order Delivered',
        message: 'Your order #1234 has been delivered successfully',
        time: '2 min ago',
        read: false,
    },
    {
        id: '2',
        type: 'payment',
        title: 'Payment Successful',
        message: 'Payment of $39.82 was successful',
        time: '1 hour ago',
        read: false,
    },
    {
        id: '3',
        type: 'order',
        title: 'Driver Assigned',
        message: 'Ahmed has been assigned to your order',
        time: '3 hours ago',
        read: true,
    },
    {
        id: '4',
        type: 'promo',
        title: 'Special Offer!',
        message: 'Get 20% off on your next 3 orders',
        time: '1 day ago',
        read: true,
    },
    {
        id: '5',
        type: 'system',
        title: 'App Update Available',
        message: 'Update to version 2.0 for new features',
        time: '2 days ago',
        read: true,
    },
];

const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'order':
            return { name: 'cube-outline' as const, color: '#4CAF50' };
        case 'payment':
            return { name: 'wallet-outline' as const, color: '#2196F3' };
        case 'promo':
            return { name: 'pricetag-outline' as const, color: '#FF9800' };
        case 'system':
            return { name: 'settings-outline' as const, color: '#9C27B0' };
        default:
            return { name: 'notifications-outline' as const, color: '#666' };
    }
};

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <Animated.View
                    entering={FadeInDown.delay(100).duration(600)}
                    style={styles.headerContent}
                >
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <TouchableOpacity style={styles.markAllButton}>
                        <Ionicons name="checkmark-done" size={24} color="#000" />
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {NOTIFICATIONS.map((notification, index) => (
                        <Animated.View
                            key={notification.id}
                            entering={FadeInDown.delay(200 + index * 100).duration(600)}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.notificationCard,
                                    !notification.read && styles.notificationUnread
                                ]}
                                activeOpacity={0.7}
                            >
                                <View style={[
                                    styles.iconContainer,
                                    { backgroundColor: `${getNotificationIcon(notification.type).color}15` }
                                ]}>
                                    <Ionicons
                                        name={getNotificationIcon(notification.type).name}
                                        size={24}
                                        color={getNotificationIcon(notification.type).color}
                                    />
                                </View>

                                <View style={styles.notificationContent}>
                                    <View style={styles.notificationHeader}>
                                        <Text style={styles.notificationTitle}>
                                            {notification.title}
                                        </Text>
                                        {!notification.read && <View style={styles.unreadDot} />}
                                    </View>
                                    <Text style={styles.notificationMessage}>
                                        {notification.message}
                                    </Text>
                                    <Text style={styles.notificationTime}>
                                        {notification.time}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}

                    {NOTIFICATIONS.length === 0 && (
                        <View style={styles.emptyState}>
                            <Ionicons name="notifications-off-outline" size={80} color="#E0E0E0" />
                            <Text style={styles.emptyTitle}>No Notifications</Text>
                            <Text style={styles.emptyMessage}>
                                You're all caught up! We'll notify you when something new happens.
                            </Text>
                        </View>
                    )}
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
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2C3E50',
    },
    markAllButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 8,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 16,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    notificationUnread: {
        backgroundColor: '#F0FFF0',
        borderColor: Colors.primary,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary,
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 8,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
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
