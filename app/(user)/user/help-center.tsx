import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

const FAQ_DATA = [
    {
        question: 'How do I track my order?',
        answer: 'You can track your order in real-time from the Orders tab. Simply tap on your active order to see the live location of your delivery partner.',
    },
    {
        question: 'What are the delivery charges?',
        answer: 'Delivery charges vary based on distance and vehicle type. You can see the exact cost before confirming your order.',
    },
    {
        question: 'How can I cancel my order?',
        answer: 'You can cancel your order within 5 minutes of placement for a full refund. Go to Orders, select your order, and tap Cancel.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept credit cards, debit cards, Apple Pay, Google Pay, and cash on delivery for select orders.',
    },
    {
        question: 'How do I add a new delivery address?',
        answer: 'When creating an order, tap on the location field and either enter a new address or select from your saved locations.',
    },
    {
        question: 'Can I schedule a delivery for later?',
        answer: 'Yes! When creating an order, you can choose to schedule it for a specific date and time that works for you.',
    },
    {
        question: 'What if my item is damaged?',
        answer: 'If your item arrives damaged, please contact our support team immediately through the app. We\'ll investigate and provide a resolution.',
    },
    {
        question: 'How do I become a delivery partner?',
        answer: 'Visit our website at www.gogo.ae/partner to learn more about becoming a delivery partner and submit your application.',
    },
];

export default function HelpCenterScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const filteredFAQs = FAQ_DATA.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <Animated.View
                entering={FadeInUp.delay(100).duration(600)}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help Center</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                    {/* Search */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#999" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for help..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.quickActions}>
                        <TouchableOpacity
                            style={styles.actionCard}
                            onPress={() => router.push('/(user)/user/contact-us')}
                        >
                            <View style={styles.actionIcon}>
                                <Ionicons name="chatbubble-ellipses" size={24} color={Colors.primaryDark} />
                            </View>
                            <Text style={styles.actionTitle}>Contact Us</Text>
                            <Text style={styles.actionSubtitle}>Get in touch</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionCard}>
                            <View style={styles.actionIcon}>
                                <Ionicons name="call" size={24} color={Colors.primaryDark} />
                            </View>
                            <Text style={styles.actionTitle}>Call Support</Text>
                            <Text style={styles.actionSubtitle}>24/7 Available</Text>
                        </TouchableOpacity>
                    </View>

                    {/* FAQs */}
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

                    {filteredFAQs.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Ionicons name="search-outline" size={48} color="#ccc" />
                            <Text style={styles.emptyText}>No results found</Text>
                            <Text style={styles.emptySubtext}>Try a different search term</Text>
                        </View>
                    ) : (
                        filteredFAQs.map((faq, index) => (
                            <Animated.View
                                key={index}
                                entering={FadeInDown.delay(300 + index * 50).duration(600)}
                            >
                                <TouchableOpacity
                                    style={styles.faqCard}
                                    onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.faqHeader}>
                                        <Text style={styles.faqQuestion}>{faq.question}</Text>
                                        <Ionicons
                                            name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                                            size={20}
                                            color="#999"
                                        />
                                    </View>
                                    {expandedIndex === index && (
                                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                                    )}
                                </TouchableOpacity>
                            </Animated.View>
                        ))
                    )}

                    <View style={{ height: 40 }} />
                </Animated.View>
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
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 52,
        marginTop: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: Colors.text,
    },
    quickActions: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    actionCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    actionIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F0FFF0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: 12,
        color: '#999',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 16,
    },
    faqCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
        marginRight: 12,
    },
    faqAnswer: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 4,
    },
});
