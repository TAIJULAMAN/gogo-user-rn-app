import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

export default function TermsOfServiceScreen() {
    const router = useRouter();

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
                <Text style={styles.headerTitle}>Terms of Service</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                    <Text style={styles.lastUpdated}>Last updated: January 2024</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                        <Text style={styles.paragraph}>
                            By accessing and using the GOGO delivery service, you accept and agree to be bound by the terms and provision of this agreement.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. Use of Service</Text>
                        <Text style={styles.paragraph}>
                            GOGO provides a platform for delivery services. You agree to use the service only for lawful purposes and in accordance with these Terms.
                        </Text>
                        <Text style={styles.paragraph}>
                            You must not use our service:
                        </Text>
                        <Text style={styles.bulletPoint}>• For any unlawful purpose</Text>
                        <Text style={styles.bulletPoint}>• To transmit any harmful or offensive content</Text>
                        <Text style={styles.bulletPoint}>• To interfere with or disrupt the service</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. User Accounts</Text>
                        <Text style={styles.paragraph}>
                            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. Delivery Services</Text>
                        <Text style={styles.paragraph}>
                            GOGO connects users with delivery partners. While we strive to ensure timely and safe deliveries, we do not guarantee specific delivery times and are not liable for delays caused by factors beyond our control.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>5. Payment Terms</Text>
                        <Text style={styles.paragraph}>
                            All fees are charged in AED. Payment is due at the time of booking. We accept various payment methods including credit cards, debit cards, and digital wallets.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>6. Cancellation Policy</Text>
                        <Text style={styles.paragraph}>
                            You may cancel orders within 5 minutes of placement for a full refund. Cancellations after this period may incur charges.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
                        <Text style={styles.paragraph}>
                            GOGO shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the service.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>8. Changes to Terms</Text>
                        <Text style={styles.paragraph}>
                            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or app notification.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>9. Contact Information</Text>
                        <Text style={styles.paragraph}>
                            If you have any questions about these Terms, please contact us at support@gogo.ae
                        </Text>
                    </View>

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
    lastUpdated: {
        fontSize: 13,
        color: '#999',
        marginTop: 20,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666',
        marginBottom: 12,
    },
    bulletPoint: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666',
        marginLeft: 16,
        marginBottom: 6,
    },
});
