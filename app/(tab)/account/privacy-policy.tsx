import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useGetCommonContentQuery } from '../../../Redux/api/commonApi';
import { Colors } from '../../../constants/Colors';

export default function PrivacyPolicyScreen() {
    const router = useRouter();
    const { data, isLoading } = useGetCommonContentQuery(undefined);
    const privacyPolicy = data?.data?.privacyPolicy?.trim();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Animated.View
                entering={FadeInUp.delay(100).duration(600)}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={{ width: 24 }} />
            </Animated.View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>
                    {isLoading ? 'Loading latest privacy policy...' : 'Latest privacy policy from GOGO'}
                </Text>

                <View style={styles.section}>
                    <Text style={styles.paragraph}>
                        {privacyPolicy || (isLoading ? '' : 'Privacy policy is not available right now.')}
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    content: {
        padding: 24,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#999',
        marginBottom: 24,
    },
    section: {
        marginBottom: 32,
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 24,
        color: '#666',
    },
});
