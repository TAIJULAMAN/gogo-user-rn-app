import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { OnboardingSlider } from "../../components/OnboardingSlider";
import {
  useCheckUserByPhoneMutation,
  useLogInMutation,
} from "../../Redux/features/auth/authApi";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { COUNTRIES, Country } from "../../constants/countries";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  const [checkUserByPhone, { isLoading: isChecking }] =
    useCheckUserByPhoneMutation();
  const [logInMutation] = useLogInMutation();

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery),
  );

  // ✅ FIXED WEB RECAPTCHA SETUP
  useEffect(() => {
    if (Platform.OS === "web") {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("Recaptcha verified");
            },
          },
          auth,
        );

        window.recaptchaVerifier.render();
      }
    }
  }, []);

  const handleContinue = async () => {
    if (!phone || phone.length < 8) {
      Alert.alert("Error", "Enter a valid phone number");
      return;
    }

    const fullPhoneNumber = `${selectedCountry.dialCode}${phone}`;
    setIsLoggingIn(true);

    try {
      const checkResponse = await checkUserByPhone({
        phoneNumber: fullPhoneNumber,
      }).unwrap();

      if (checkResponse?.data?.exists) {
        let confirmationResult;

        if (Platform.OS === "web") {
          const appVerifier = window.recaptchaVerifier;

          if (!appVerifier) {
            throw new Error("Recaptcha not initialized");
          }

          confirmationResult = await signInWithPhoneNumber(
            auth,
            fullPhoneNumber,
            appVerifier,
          );
        } else {
          if (!recaptchaVerifier.current) {
            throw new Error("Recaptcha not ready");
          }

          confirmationResult = await signInWithPhoneNumber(
            auth,
            fullPhoneNumber,
            recaptchaVerifier.current,
          );
        }

        // Save confirmation
        window.confirmationResult = confirmationResult;

        // Call backend login
        await logInMutation({ phoneNumber: fullPhoneNumber }).unwrap();

        router.push({
          pathname: "/(auth)/verify-otp",
          params: { phone: fullPhoneNumber },
        });
      } else {
        router.push({
          pathname: "/(auth)/sign-up",
          params: { phone: fullPhoneNumber },
        });
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Error",
        error?.message || "Something went wrong. Try again.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Native Recaptcha */}
      {Platform.OS !== "web" && (
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={auth.app.options}
        />
      )}

      {/* ✅ Web Recaptcha container */}
      {Platform.OS === "web" && <View id="recaptcha-container" />}

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="dark-content" />

        <View style={styles.content}>
          <OnboardingSlider />

          <View style={styles.bottomCard}>
            <Text style={styles.welcomeText}>Welcome 👋</Text>

            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.countryPicker}
                onPress={() => setShowCountryPicker(true)}
              >
                <Image
                  source={{ uri: selectedCountry.flag }}
                  style={{ width: 24, height: 16 }}
                />
                <Text>{selectedCountry.dialCode}</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.phoneInput}
                placeholder="Mobile Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              disabled={isChecking || isLoggingIn}
            >
              <Text>
                {isChecking || isLoggingIn ? "Please wait..." : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Country Picker */}
      <Modal visible={showCountryPicker} animationType="slide">
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCountry(item);
                setShowCountryPicker(false);
              }}
            >
              <Text>
                {item.name} ({item.dialCode})
              </Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "flex-end" },
  bottomCard: { padding: 20, backgroundColor: "#fff" },
  welcomeText: { fontSize: 22, fontWeight: "bold" },
  inputContainer: { flexDirection: "row", marginTop: 20 },
  countryPicker: { flexDirection: "row", marginRight: 10 },
  phoneInput: { flex: 1, borderWidth: 1, padding: 10 },
  continueButton: {
    marginTop: 20,
    backgroundColor: "#abffaf",
    padding: 15,
    alignItems: "center",
  },
});
