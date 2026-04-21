import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [hasTaxDetails, setHasTaxDetails] = useState(false);
  const [isTaxModalVisible, setIsTaxModalVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Form states
  const [trnNo, setTrnNo] = useState("");
  const [trnAddress, setTrnAddress] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleConfirmTax = () => {
    if (!trnNo || !trnAddress || !companyName) {
      Alert.alert("Error", "Please fill in all tax details.");
      return;
    }
    setHasTaxDetails(true);
    setIsTaxModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/(auth)/sign-in"),
      },
    ]);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      Alert.alert(
        "Verification Requested",
        "We've sent a verification link to your email.",
      );
    }, 1500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Background watermark icon (simulated) */}
        <View style={styles.watermarkContainer}>
          <Ionicons
            name="person-circle-outline"
            size={240}
            color="#9ef586"
            style={{ opacity: 0.15, transform: [{ rotate: "-15deg" }] }}
          />
        </View>

        {/* Top Header Section */}
        <View style={styles.header}>
          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.avatarCircle}
              onPress={() => router.push("/(user)/user/edit-profile")}
            >
              <Text style={styles.avatarInitials}>RH</Text>
            </TouchableOpacity>
            <View style={styles.avatarBadge}>
              <Ionicons name="star" size={12} color="#000" />
            </View>
          </View>

          <Text style={styles.userName}>Roshan Hegde</Text>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>hshaaj@gmail.com</Text>
            {hasTaxDetails ? (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text style={styles.verifiedBadgeText}>Verified</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.verifyBtn}
                onPress={handleVerify}
                disabled={isVerifying}
              >
                <Text style={styles.verifyText}>
                  {isVerifying ? "Verifying..." : "Verify"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {hasTaxDetails ? (
            <View style={styles.trnBadgeContainer}>
              <Ionicons
                name="shield-checkmark"
                size={16}
                color="#000"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.trnBadgeText}>
                TRN: {trnNo || "104143405900003"}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addTaxBtn}
              onPress={() => setIsTaxModalVisible(true)}
            >
              <Ionicons name="document-text" size={18} color="#000" />
              <Text style={styles.addTaxBtnText}>Add UAE Tax Details</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Two Card Row */}
        <View style={styles.twoCardRow}>
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push("/(user)/user/address-book")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "#F0FDF4" }]}>
              <Ionicons name="location" size={22} color="#16A34A" />
            </View>
            <Text style={styles.gridCardText}>Saved Addresses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => router.push("/(user)/user/help-center")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "#FFF7ED" }]}>
              <Ionicons name="help-buoy" size={22} color="#EA580C" />
            </View>
            <Text style={styles.gridCardText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Refer and Earn Card */}
        <View style={styles.referCard}>
          <View style={styles.referCardLeft}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: "#9ef586", marginBottom: 0, opacity: 0.9 },
              ]}
            >
              <Ionicons name="gift" size={22} color="#000" />
            </View>
            <View style={styles.referTextCombo}>
              <Text style={styles.referTitle}>Refer and earn</Text>
              <Text style={styles.referSubtitle}>
                Get AED 10 for each friend
              </Text>
            </View>
          </View>
          <View style={styles.referCardRight}>
            <TouchableOpacity
              style={styles.inviteBtn}
              onPress={() => router.push("/(user)/user/referral")}
            >
              <Text style={styles.inviteBtnText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Options List */}
        <View style={styles.menuList}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(user)/user/edit-profile")}
          >
            <View
              style={[styles.menuIconCircle, { backgroundColor: "#F8FAFC" }]}
            >
              <Ionicons name="settings-outline" size={20} color="#64748B" />
            </View>
            <Text style={styles.menuItemText}>Account Settings</Text>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/(user)/user/terms-of-service")}
          >
            <View
              style={[styles.menuIconCircle, { backgroundColor: "#F8FAFC" }]}
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#64748B"
              />
            </View>
            <Text style={styles.menuItemText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View
              style={[styles.menuIconCircle, { backgroundColor: "#FFF1F2" }]}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color="#E11D48"
                style={{ marginLeft: 3 }}
              />
            </View>
            <Text style={[styles.menuItemText, { color: "#E11D48" }]}>
              Logout
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {/* Version Text */}
        <Text style={styles.versionText}>App version 6.57.1</Text>
      </ScrollView>

      {/* Add Tax Modal */}
      <Modal
        visible={isTaxModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsTaxModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>UAE Tax Details</Text>
                <Text style={styles.modalSubtitle}>
                  Please enter your TRN info below
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsTaxModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>TRN Number</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Ex: 104143405900003"
                placeholderTextColor="#94A3B8"
                value={trnNo}
                onChangeText={setTrnNo}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>TRN Registered Address</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter full address"
                placeholderTextColor="#94A3B8"
                value={trnAddress}
                onChangeText={setTrnAddress}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Company Name / Personal Name
              </Text>
              <TextInput
                style={styles.inputField}
                placeholder="Ex: My Cargo LLC"
                placeholderTextColor="#94A3B8"
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleConfirmTax}
            >
              <Text style={styles.confirmBtnText}>Save Tax Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  watermarkContainer: {
    position: "absolute",
    top: -40,
    right: -60,
    zIndex: 0,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: "#fcfcfc",
    padding: 24,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#9ef586",
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: "800",
    color: "#9ef586",
  },
  editIconOverlay: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#9ef586",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fcfcfc",
  },
  avatarBadge: {
    position: "absolute",
    top: -4,
    left: -4,
    backgroundColor: "#9ef586",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fcfcfc",
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    marginBottom: 4,
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  emailText: {
    fontSize: 15,
    color: "#64748B",
    marginRight: 10,
  },
  verifyBtn: {
    backgroundColor: "#9ef586",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  verifyText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#000",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  verifiedBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#10B981",
    marginLeft: 4,
  },
  addTaxBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: "#9ef586",
    borderWidth: 1,
    borderColor: "#000",
  },
  addTaxBtnText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 8,
  },
  trnBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  trnBadgeText: {
    color: "#9ef586",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  // Card Styles
  twoCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  gridCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    flex: 1,
    padding: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  gridCardText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  referCard: {
    backgroundColor: "#000",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  referCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  referTextCombo: {
    marginLeft: 16,
    flex: 1,
  },
  referTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#9ef586",
    marginBottom: 2,
  },
  referSubtitle: {
    fontSize: 13,
    color: "#fff",
    opacity: 0.7,
  },
  referCardRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  inviteBtn: {
    backgroundColor: "#9ef586",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  inviteBtnText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "800",
  },
  menuList: {
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 8,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  menuIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginLeft: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F8FAFC",
    marginLeft: 78,
    marginRight: 20,
  },
  versionText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 32,
    padding: 24,
    width: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  modalCloseBtn: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputField: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#0F172A",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  confirmBtn: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
  },
  confirmBtnText: {
    color: "#9ef586",
    fontSize: 16,
    fontWeight: "800",
  },
});
