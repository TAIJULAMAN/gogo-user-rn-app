
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Fast & Reliable Delivery',
        description: 'Get your packages delivered in record time with our verified couriers.',
        image: require('../../assets/images/react-logo.png'), // Placeholder
    },
    {
        id: '2',
        title: 'Track Your Parcel',
        description: 'Real-time tracking for your peace of mind. Know exactly where your package is.',
        image: require('../../assets/images/react-logo.png'),
    },
    {
        id: '3',
        title: 'Secure Payments',
        description: 'Multiple payment options including cash on delivery and secure online payments.',
        image: require('../../assets/images/react-logo.png'),
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            router.replace('/(auth)/sign-in');
        }
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

            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfig}
                scrollEventThrottle={32}
            />

            <View style={styles.footer}>
                <View style={styles.pagination}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.dotActive,
                            ]}
                        />
                    ))}
                </View>

                <Button
                    title={currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
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
        height: 60,
        justifyContent: 'center',
    },
    slide: {
        width: width,
        height: height * 0.65,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    image: {
        width: '80%',
        height: '50%',
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
        height: height * 0.25, // Bottom 25%
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    dot: {
        height: 8,
        width: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginHorizontal: 4,
    },
    dotActive: {
        width: 24,
        backgroundColor: Colors.light.primary,
    },
    button: {
        width: '100%',
    },
});
