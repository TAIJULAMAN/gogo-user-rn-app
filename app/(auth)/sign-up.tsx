import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function SignUpScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Focus states
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const { signIn } = useAuth();

    const handleSignUp = async () => {
        setLoading(true);
        await signIn('user');
        setLoading(false);
        router.replace('/(user)/user');
    };

    const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry = false, keyboardType = 'default', id }: any) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputWrapper,
                focusedInput === id && styles.inputWrapperFocused
            ]}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    onFocus={() => setFocusedInput(id)}
                    onBlur={() => setFocusedInput(null)}
                />
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View
                    entering={FadeInUp.delay(200).duration(800)}
                    style={styles.header}
                >
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started!</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(400).duration(800)}
                    style={styles.form}
                >
                    <InputField
                        id="name"
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholder="John Doe"
                    />

                    <InputField
                        id="email"
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="user@example.com"
                        keyboardType="email-address"
                    />

                    <InputField
                        id="phone"
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+971 XX XXX XXXX"
                        keyboardType="phone-pad"
                    />

                    <InputField
                        id="password"
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    <InputField
                        id="confirmPassword"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="••••••••"
                        secureTextEntry
                    />

                    <Button
                        title="Sign Up"
                        onPress={handleSignUp}
                        style={styles.signUpButton}
                        loading={loading}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.linkText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 24,
        paddingTop: 60,
    },
    header: {
        marginBottom: 32,
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
    signUpButton: {
        marginTop: 12,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 40,
    },
    footerText: {
        color: '#666',
        fontSize: 15,
    },
    linkText: {
        color: Colors.primaryDark,
        fontWeight: '700',
        fontSize: 15,
    },
});
