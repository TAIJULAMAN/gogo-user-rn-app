import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useGetCommonContentQuery } from '../../../Redux/api/commonApi';
import { Colors } from '../../../constants/Colors';

export default function TermsOfServiceScreen() {
    const router = useRouter();
    const { data, isLoading } = useGetCommonContentQuery(undefined);
    const terms = data?.data?.termsAndConditions?.trim();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ headerShown: false }} />

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
                    <Text style={styles.lastUpdated}>
                        {isLoading ? 'Loading latest terms...' : 'Latest terms from GOGO'}
                    </Text>
                    <View style={styles.section}>
                        <Text style={styles.paragraph}>
                            {terms || (isLoading ? '' : 'Terms are not available right now.')}
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
        marginBottom: 16,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 24,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666',
        marginBottom: 12,
    },
});
