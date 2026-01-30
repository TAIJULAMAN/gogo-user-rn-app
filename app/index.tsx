
import { Redirect } from 'expo-router';

export default function Index() {
    // Logic to determine where to send the user
    // If first time -> /splash -> /onboarding
    // If signed in -> /(tabs)
    // Else -> /sign-in

    return <Redirect href="/splash" />;
}
