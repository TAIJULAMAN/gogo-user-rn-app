import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function SignInScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);

    const { signIn } = useAuth(); // You might need to update AuthContext to handle phone-only sign-in if it doesn't already

    const handleSignIn = async () => {
        setLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setLoading(false);
            // Navigate to Verify OTP screen, passing the phone number if needed
            // For now, we'll just push to the existing verify-otp route
            router.push({
                pathname: '/(auth)/verify-otp',
                params: { phone }
            });
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="dark-content" />

            <View style={styles.content}>
                <Animated.View
                    entering={FadeInUp.delay(200).duration(800)}
                    style={styles.header}
                >
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Enter your phone number to continue</Text>
                </Animated.View>

                <View style={styles.form}>
                    <Animated.View
                        entering={FadeInDown.delay(400).duration(800)}
                        style={styles.inputContainer}
                    >
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={[
                            styles.inputWrapper,
                            isPhoneFocused && styles.inputWrapperFocused
                        ]}>
                            <TextInput
                                style={styles.input}
                                placeholder="+971 XX XXX XXXX"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                onFocus={() => setIsPhoneFocused(true)}
                                onBlur={() => setIsPhoneFocused(false)}
                            />
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(600).duration(800)}>
                        <Button
                            title="Get OTP"
                            onPress={handleSignIn}
                            style={styles.signInButton}
                            loading={loading}
                        />
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.delay(800).duration(800)}
                        style={styles.footer}
                    >
                        <Text style={styles.footerText}>Do not have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
    },
    inputWrapper: {
        height: 56,
        borderWidth: 1.5,
        borderColor: '#EFEFEF',
        borderRadius: 16,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
    },
    inputWrapperFocused: {
        borderColor: Colors.primary,
        backgroundColor: '#fff',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.text,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 32,
    },
    signInButton: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        color: '#666',
        fontSize: 15,
    },
    linkText: {
        color: Colors.primaryDark, // Darker green for readability
        fontWeight: '700',
        fontSize: 15,
    },
});
