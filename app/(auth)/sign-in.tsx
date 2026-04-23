import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
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
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingSlider } from "../../components/OnboardingSlider";
import {
  useCheckUserByPhoneMutation,
  useLogInMutation,
} from "../../Redux/features/auth/authApi";

import { COUNTRIES, Country } from "../../constants/countries";
import { auth } from "../../config/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false); // Manually handle logging state for better control

  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  const [checkUserByPhone, { isLoading: isChecking }] =
    useCheckUserByPhoneMutation();
  const [logInMutation] = useLogInMutation(); // Renamed to avoid confusion with the action

  const textOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery),
  );

  const handleContinue = async () => {
    if (!phone || phone.length < 8) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    const fullPhoneNumber = `${selectedCountry.dialCode}${phone}`;
    setIsLoggingIn(true);

    try {
      // 1. Check if user exists
      const checkResponse = await checkUserByPhone({
        phoneNumber: fullPhoneNumber,
      }).unwrap();

      if (checkResponse?.data?.exists) {
        console.log("User exists");

        // 2. If exists, send a verification code using firebase
        let confirmationResult;
        if (Platform.OS === "web") {
          const appVerifier = window.recaptchaVerifier;
          confirmationResult = await signInWithPhoneNumber(
            auth,
            fullPhoneNumber,
            appVerifier,
          );
        } else {
          // Native implementation
          if (!recaptchaVerifier.current) {
            throw new Error("Recaptcha verifier not initialized");
          }
          confirmationResult = await signInWithPhoneNumber(
            auth,
            fullPhoneNumber,
            recaptchaVerifier.current,
          );
        }
        
        window.confirmationResult = confirmationResult;

        // 3. After step 2 complete log in and redirect to verify otp
        await logInMutation({ phoneNumber: fullPhoneNumber }).unwrap();

        router.push({
          pathname: "/(auth)/verify-otp",
          params: { phone: fullPhoneNumber },
        });
      } else {
        // 4. If not exists, redirect to sign-up
        router.push({
          pathname: "/(auth)/sign-up",
          params: { phone: fullPhoneNumber },
        });
      }
    } catch (error: any) {
      console.error("Auth flow error:", error);
      Alert.alert(
        "Error",
        error?.message || error?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 1000 });
    logoScale.value = withSpring(1);
    textOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(500, withSpring(0));

    // Initialize Recaptcha Verifier for Web
    if (Platform.OS === "web") {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: (response: any) => {
            console.log("Recaptcha verified");
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        });
      }
    }
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS !== "web" && (
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={auth.app.options}
        />
      )}
      {/* Hidden Recaptcha Container for Web */}
      {Platform.OS === "web" && <View id="recaptcha-container" />}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar barStyle="dark-content" />
        <View style={styles.content}>
          {/* Logo Area */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(800)}
            style={styles.header}
          >
            <Animated.Image
              source={require("../../assets/logo/logo.png")}
              style={[styles.logo, logoStyle]}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Slider Area */}
          <OnboardingSlider />

          {/* Bottom Card */}
          <Animated.View
            entering={FadeInDown.delay(600).duration(800)}
            style={styles.bottomCard}
          >
            <Text style={styles.welcomeText}>Welcome 👋</Text>
            <Text style={styles.subtitleText}>
              With a valid number, you can access deliveries, and our other
              services
            </Text>

            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.countryPicker}
                onPress={() => setShowCountryPicker(true)}
              >
                <Image
                  source={{ uri: selectedCountry.flag }}
                  style={{
                    width: 24,
                    height: 16,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.callingCode}>
                  {selectedCountry.dialCode}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>

              <View
                style={[
                  styles.phoneInputWrapper,
                  isPhoneFocused && styles.phoneInputWrapperFocused,
                ]}
              >
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Mobile Number"
                  placeholderTextColor="#A0A0A0"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={() => setIsPhoneFocused(false)}
                />
              </View>
            </View>

            {phone.length > 4 && (
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  (isChecking || isLoggingIn) && { opacity: 0.7 },
                ]}
                onPress={handleContinue}
                disabled={isChecking || isLoggingIn}
              >
                <Text style={styles.continueButtonText}>
                  {isChecking || isLoggingIn ? "Please wait..." : "Continue"}
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>

      {/* Country Picker Modal */}
      <Modal visible={showCountryPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#999" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search country or code"
                value={searchQuery}
                onChangeText={setSearchQuery}
                {...(Platform.OS === "web" ? { outlineStyle: "none" } : {})}
              />
            </View>

            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item);
                    setShowCountryPicker(false);
                    setSearchQuery("");
                  }}
                >
                  <View style={styles.countryInfo}>
                    <Image
                      source={{ uri: item.flag }}
                      style={styles.itemFlag}
                      resizeMode="cover"
                    />
                    <Text style={styles.countryName}>{item.name}</Text>
                  </View>
                  <Text style={styles.itemDialCode}>{item.dialCode}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 70 : 60,
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  logoText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#000", // PORTER Blue
    letterSpacing: 2,
  },
  logoIcon: {
    marginTop: 4,
    marginLeft: -2,
  },
  logo: {
    width: 200,
    height: 80,
  },
  bottomCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 15,
    color: "#777",
    lineHeight: 22,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: "100%",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  flagText: {
    fontSize: 20,
    marginRight: 6,
  },
  callingCode: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginRight: 6,
  },
  phoneInputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  phoneInputWrapperFocused: {
    borderColor: "#0047E0",
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#abffaf",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#0047E0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  countryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  countryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemFlag: {
    width: 30,
    height: 20,
    borderRadius: 2,
    marginRight: 15,
  },
  countryName: {
    fontSize: 16,
    color: "#333",
  },
  itemDialCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
});
