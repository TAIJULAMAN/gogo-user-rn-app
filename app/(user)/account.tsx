import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../constants/Colors';
import { useAuth } from '../../context/AuthContext';

export default function AccountScreen() {
    const { signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        await signOut();
                    }
                }
            ]
        );
    };

    const MenuItem = ({ icon, title, onPress, color = Colors.text }: { icon: any, title: string, onPress?: () => void, color?: string }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuIconContainer}>
                <Ionicons name={icon} size={22} color={Colors.text} />
            </View>
            <Text style={[styles.menuText, { color }]}>{title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <Text style={styles.title}>Account</Text>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>JD</Text>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileEmail}>john.doe@example.com</Text>
                    <View style={styles.memberBadge}>
                        <Text style={styles.memberText}>Gold Member</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton}>
                    <Ionicons name="pencil" size={20} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Settings</Text>
                <View style={styles.card}>
                    <MenuItem icon="notifications-outline" title="Notifications" />
                    <View style={styles.divider} />
                    <MenuItem icon="lock-closed-outline" title="Privacy & Security" />
                    <View style={styles.divider} />
                    <MenuItem icon="language-outline" title="Language" />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Support</Text>
                <View style={styles.card}>
                    <MenuItem icon="help-circle-outline" title="Help Center" />
                    <View style={styles.divider} />
                    <MenuItem icon="chatbubble-ellipses-outline" title="Contact Us" />
                </View>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={[styles.card, styles.logoutButton]} onPress={handleSignOut}>
                    <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    title: {
        fontFamily: Fonts.black,
        fontSize: 32,
        color: Colors.text,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontFamily: Fonts.black,
        fontSize: 28,
        color: Colors.text,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: Colors.text,
        marginBottom: 4,
    },
    profileEmail: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    memberBadge: {
        backgroundColor: '#FFF9C4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    memberText: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        color: '#FBC02D',
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    section: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    sectionHeader: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: Colors.text,
        marginBottom: 12,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuText: {
        flex: 1,
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: Colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginLeft: 68,
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        gap: 8,
    },
    logoutText: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: '#FF3B30',
    },
    versionContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    versionText: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        color: '#CCC',
    },
});
