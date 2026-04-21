import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Colors } from "../../constants/Colors";

const RECENT_TRANSACTIONS = [
  {
    id: "1",
    type: "Payment",
    amount: "- AED 35.00",
    date: "Oct 24, 10:30 AM",
    icon: "remove-circle-outline",
    color: "#F44336",
  },
  {
    id: "2",
    type: "Payment",
    amount: "- AED 28.50",
    date: "Oct 23, 2:15 PM",
    icon: "remove-circle-outline",
    color: "#F44336",
  },
  {
    id: "3",
    type: "Refund",
    amount: "+ AED 42.00",
    date: "Oct 22, 9:00 AM",
    icon: "add-circle-outline",
    color: "#4CAF50",
  },
];

export default function TransactionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Animated.Text
          entering={FadeInUp.delay(100).duration(600)}
          style={styles.title}
        >
          Transactions
        </Animated.Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {/* Balance Card */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.card}
          >
            <View>
              <Text style={styles.cardLabel}>Total Balance</Text>
              <Text style={styles.cardAmount}>AED 436.50</Text>
            </View>
            <View style={styles.cardIcon}>
              <Ionicons name="wallet" size={32} color="#000" />
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(600)}
            style={styles.actionRow}
          >
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(user)/user/cards")}
              activeOpacity={0.7}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="card-outline" size={24} color={Colors.text} />
              </View>
              <Text style={styles.actionText}>Cards</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(user)/user/transaction-history")}
              activeOpacity={0.7}
            >
              <View style={styles.actionIcon}>
                <Ionicons
                  name="receipt-outline"
                  size={24}
                  color={Colors.text}
                />
              </View>
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.sectionHeader}
          >
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => router.push("/(user)/user/transaction-history")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </Animated.View>

          {RECENT_TRANSACTIONS.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(500 + index * 100).duration(600)}
            >
              <TouchableOpacity
                style={styles.transactionItem}
                activeOpacity={0.7}
              >
                <View style={styles.transactionLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: item.color + "20" },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={item.color}
                    />
                  </View>
                  <View>
                    <Text style={styles.transactionType}>{item.type}</Text>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: item.type === "Refund" ? "#4CAF50" : Colors.text },
                  ]}
                >
                  {item.amount}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#abffaf",
    color: "#000",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    height: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardLabel: {
    color: "#000",
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "500",
  },
  cardAmount: {
    color: "#000",
    fontSize: 28,
    fontWeight: "800",
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primaryDark,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionType: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: "#888",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "800",
  },
});
