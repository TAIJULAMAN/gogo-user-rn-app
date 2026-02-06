import { useRouter } from 'expo-router';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Button } from '../components/Button';
import { Colors } from '../constants/Colors';

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
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    source={require('../assets/quick.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Animated.Text
                        entering={FadeInDown.delay(400).duration(800)}
                        style={styles.title}
                    >
                        Quick & Easy
                    </Animated.Text>
                    <Animated.Text
                        entering={FadeInDown.delay(600).duration(800)}
                        style={styles.description}
                    >
                        Quick & Easy parcel delivery service.
                    </Animated.Text>
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
        height: '50%',
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.text,
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
        paddingBottom: 50,
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
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
    },
    dotActive: {
        width: 24,
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    button: {
        width: '100%',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
});
