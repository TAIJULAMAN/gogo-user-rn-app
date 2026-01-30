
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        // Navigate to onboarding after 2.5 seconds
        const timer = setTimeout(() => {
            router.replace('/onboarding1');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('../assets/logo/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.tagline}>Deliver Things Across UAE</Text>
                <Text style={styles.subtagline}>in Minutes!</Text>
            </View>

            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#2C3E50" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.primary, // #BEFFB6
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 24,
    },
    tagline: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C3E50',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    subtagline: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C3E50',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 4,
    },
    footer: {
        marginBottom: 20,
    },
});
