
import { useRouter } from 'expo-router';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';

export default function Onboarding2() {
    const router = useRouter();

    const handleNext = () => {
        router.push('/onboarding3');
    };

    const handleSkip = () => {
        router.replace('/(auth)/sign-in');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Button
                    title="Skip"
                    onPress={handleSkip}
                    variant="ghost"
                    textStyle={{ color: '#666' }}
                    style={{ alignSelf: 'flex-end' }}
                />
            </View>

            <View style={styles.content}>
                <Image
                    source={require('../assets/quick.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Quick & Easy</Text>
                    <Text style={styles.description}>
                        Quick & Easy parcel delivery service.
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                </View>

                <Button
                    title="Next"
                    onPress={handleNext}
                    style={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        height: 100,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    image: {
        width: '100%',
        height: '60%',
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#000',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        gap: 20,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        height: 8,
        width: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    dotActive: {
        width: 24,
        backgroundColor: '#BEFFB6',
    },
    button: {
        width: '100%',
    },
});
