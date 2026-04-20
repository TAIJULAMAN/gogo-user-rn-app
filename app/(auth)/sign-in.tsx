import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
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
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  { id: "1", image: require("@/assets/quick.png") },
  { id: "2", image: require("@/assets/secure.png") },
  { id: "3", image: require("@/assets/vehicles/bike.png") },
];

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(width);
  const flatListRef = useRef<FlatList>(null);
  const textOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  console.log(SLIDES[0]?.image);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    if (sliderWidth > 0) {
      const slideIndex = Math.round(scrollPosition / sliderWidth);
      if (
        slideIndex !== activeSlide &&
        slideIndex >= 0 &&
        slideIndex < SLIDES.length
      ) {
        setActiveSlide(slideIndex);
      }
    }
  };

  const handleContinue = () => {
    router.push({
      pathname: "/(auth)/verify-otp",
      params: { phone },
    });
  };

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      setActiveSlide((prev) => {
        const nextSlide = (prev + 1) % SLIDES.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: nextSlide,
            animated: true,
          });
        }
        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(autoPlayTimer);
  }, [sliderWidth]);

  useEffect(() => {
    // Animate Logo
    logoOpacity.value = withTiming(1, { duration: 1000 });
    logoScale.value = withSpring(1);

    // Animate Text with delay
    textOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(500, withSpring(0));

    // Removed the splash screen timeout to prevent an infinite loop on the sign in page
  }, []);
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
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
        <Animated.View
          entering={FadeInUp.delay(400).duration(800)}
          style={[styles.sliderContainer, { width: sliderWidth }]}
          onLayout={(e) => {
            const layoutWidth = e.nativeEvent.layout.width;
            if (layoutWidth > 0) {
              setSliderWidth(layoutWidth);
            }
          }}
        >
          <FlatList
            ref={flatListRef}
            style={{ flex: 1 }}
            data={SLIDES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            bounces={false}
            keyExtractor={(item) => item.id}
            getItemLayout={(data, index) => ({
              length: sliderWidth,
              offset: sliderWidth * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={[styles.slide, { width: sliderWidth }]}>
                <Image
                  source={item.image}
                  style={styles.slideImage}
                  resizeMode="contain"
                />
              </View>
            )}
          />
          <View style={styles.pagination}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeSlide === index && styles.dotActive]}
              />
            ))}
          </View>
        </Animated.View>

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
            <TouchableOpacity style={styles.countryPicker}>
              <Image
                source={{ uri: "https://flagcdn.com/w40/ae.png" }}
                style={{
                  width: 24,
                  height: 16,
                  marginRight: 8,
                  borderRadius: 2,
                }}
                resizeMode="cover"
              />
              <Text style={styles.callingCode}>+971</Text>
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
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
  },
  scrollContent: {
    flexGrow: 1,
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
  sliderContainer: {
    height: height * 0.45,
    width: "100%",
    position: "relative",
  },
  slide: {
    width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  slideImage: {
    width: 300,
    height: 300,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#0047E0",
    width: 24,
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
});
