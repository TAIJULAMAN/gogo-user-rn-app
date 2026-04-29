import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../../constants/Colors';

export default function AboutUsScreen() {
    const router = useRouter();

    const openWebsite = () => {
        Linking.openURL('https://gogo.ae');
    };

    const openEmail = () => {
        Linking.openURL('mailto:info@gogo.ae');
    };

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
                <Text style={styles.headerTitle}>About Us</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.delay(200).duration(600)}>
                    {/* Logo Section */}
                    <View style={styles.logoSection}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>GOGO</Text>
                        </View>
                        <Text style={styles.tagline}>Fast. Reliable. Everywhere.</Text>
                    </View>

                    {/* Mission */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Mission</Text>
                        <Text style={styles.paragraph}>
                            At GOGO, we're on a mission to revolutionize delivery services across the UAE. We believe in making deliveries fast, reliable, and accessible to everyone.
                        </Text>
                    </View>

                    {/* Story */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Story</Text>
                        <Text style={styles.paragraph}>
                            Founded in 2020, GOGO started with a simple idea: make deliveries easier for everyone. Today, we've grown to become one of the leading delivery platforms in Dubai, serving thousands of customers daily.
                        </Text>
                    </View>

                    {/* Values */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Our Values</Text>

                        <View style={styles.valueItem}>
                            <View style={styles.valueIcon}>
                                <Ionicons name="flash" size={24} color={Colors.primaryDark} />
                            </View>
                            <View style={styles.valueContent}>
                                <Text style={styles.valueTitle}>Speed</Text>
                                <Text style={styles.valueText}>We prioritize fast deliveries without compromising quality</Text>
                            </View>
                        </View>

                        <View style={styles.valueItem}>
                            <View style={styles.valueIcon}>
                                <Ionicons name="shield-checkmark" size={24} color={Colors.primaryDark} />
                            </View>
                            <View style={styles.valueContent}>
                                <Text style={styles.valueTitle}>Reliability</Text>
                                <Text style={styles.valueText}>Your packages are safe with our trusted delivery partners</Text>
                            </View>
                        </View>

                        <View style={styles.valueItem}>
                            <View style={styles.valueIcon}>
                                <Ionicons name="people" size={24} color={Colors.primaryDark} />
                            </View>
                            <View style={styles.valueContent}>
                                <Text style={styles.valueTitle}>Customer First</Text>
                                <Text style={styles.valueText}>Your satisfaction is our top priority</Text>
                            </View>
                        </View>
                    </View>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>50K+</Text>
                            <Text style={styles.statLabel}>Deliveries</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>10K+</Text>
                            <Text style={styles.statLabel}>Happy Customers</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>500+</Text>
                            <Text style={styles.statLabel}>Drivers</Text>
                        </View>
                    </View>

                    {/* Contact */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Get in Touch</Text>

                        <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
                            <Ionicons name="mail" size={20} color={Colors.primaryDark} />
                            <Text style={styles.contactText}>info@gogo.ae</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
                            <Ionicons name="globe" size={20} color={Colors.primaryDark} />
                            <Text style={styles.contactText}>www.gogo.ae</Text>
                        </TouchableOpacity>

                        <View style={styles.contactItem}>
                            <Ionicons name="location" size={20} color={Colors.primaryDark} />
                            <Text style={styles.contactText}>Dubai, United Arab Emirates</Text>
                        </View>
                    </View>

                    {/* Version */}
                    <Text style={styles.version}>Version 1.0.0</Text>

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
    logoSection: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    logoText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
    },
    tagline: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666',
    },
    valueItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    valueIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F0FFF0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    valueContent: {
        flex: 1,
    },
    valueTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    valueText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.primaryDark,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    contactText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 12,
    },
    version: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
});
