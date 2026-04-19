import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function SignUpScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleChangePress = () => {
    if (Platform.OS === "web") {
      const confirm = window.confirm(
        "Are you sure you want to change your phone number? Any entered data will be lost.",
      );
      if (confirm) {
        router.back();
      }
    } else {
      Alert.alert(
        "Change Phone Number",
        "Are you sure you want to go back and change your phone number? Any entered data will be lost.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Change",
            style: "destructive",
            onPress: () => router.back(),
          },
        ],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Area */}
        <Animated.Image
          entering={FadeInUp.delay(200).duration(800)}
          source={require("../../assets/logo/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Phone Header */}
        <Animated.View
          entering={FadeInUp.delay(300).duration(800)}
          style={styles.phoneRow}
        >
          <Image
            source={{ uri: "https://flagcdn.com/w40/ae.png" }}
            style={styles.flag}
            resizeMode="cover"
          />
          <Text style={styles.phoneNumber}>581315770</Text>
          <TouchableOpacity onPress={handleChangePress}>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Form Area */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(800)}
          style={styles.formContainer}
        >
          {/* Name Row */}
          <View style={styles.row}>
            <View style={[styles.inputWrapper, { flex: 1, marginRight: 20 }]}>
              <TextInput
                style={styles.bottomInput}
                placeholder="First name"
                placeholderTextColor="#A0A0A0"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={[styles.inputWrapper, { flex: 1 }]}>
              <TextInput
                style={styles.bottomInput}
                placeholder="Last name"
                placeholderTextColor="#A0A0A0"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.bottomInput}
              placeholder="Email Id"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Requirement Dropdown */}
          <View style={styles.requirementWrapper}>
            <Text style={styles.smallLabel}>Requirement</Text>
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.dropdownValue}>
                I will be using Porter for :
              </Text>
              <Ionicons name="chevron-down" size={16} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Referral Code */}
          <TouchableOpacity style={styles.referralContainer}>
            <Text style={styles.referralText}>Have referral code ?</Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.registerButtonText}>REGISTER</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 30,
    paddingTop: 50,
  },
  logo: {
    width: 160,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  phoneRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    marginRight: 12,
  },
  phoneNumber: {
    fontSize: 18,
    color: "#000",
    marginRight: 12,
  },
  changeText: {
    fontSize: 13,
    color: "#2B5FF5", // Vibrant blue for CHANGE text
    fontWeight: "700",
    textTransform: "uppercase",
  },
  formContainer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    height: 40,
    justifyContent: "flex-end",
    paddingBottom: 8,
    marginBottom: 25,
  },
  bottomInput: {
    fontSize: 15,
    color: "#000",
    padding: 0,
  },
  requirementWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 8,
    marginBottom: 20,
    marginTop: 5,
  },
  smallLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 6,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownValue: {
    fontSize: 15,
    color: "#000",
  },
  referralContainer: {
    marginTop: 5,
    marginBottom: 25,
  },
  referralText: {
    color: "#2B5FF5",
    fontWeight: "700",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#2B5FF5",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#2B5FF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: "#2B5FF5",
  },
  checkboxText: {
    fontSize: 13,
    color: "#888",
  },
  otpHelperText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    lineHeight: 18,
  },
});
