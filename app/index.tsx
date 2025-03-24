import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { getCustomerCards } from "./services/api";
import CardItem from "./components/CardItem";

export default function HomeScreen() {
  const [customerId, setCustomerId] = useState("");
  const [cards, setCards] = useState<
    { pan: string; expiry: string; name_on_card: string; cardstatus: string; cardtype: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const fetchCards = async () => {
    if (!customerId.trim()) return;
    setIsLoading(true);
    try {
      const result = await getCustomerCards(customerId);
      setCards(
        result.map((card) => ({
          pan: card.pan,
          expiry: card.expiry,
          name_on_card: card.name_on_card,
          cardstatus: card.cardstatus,
          cardtype: card.cardtype,
          cardtypenetwork: card.cardtypenetwork || "Unknown",
          virtual: card.virtual || "false",
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#f8fafc", "#e2e8f0"]} style={styles.container}>
      {/* Premium Navigation Bar */}
      <LinearGradient
        colors={["#ffffff", "#f1f5f9"]}
        start={[0.1, 0.1]}
        end={[0.9, 0.9]}
        style={styles.navBar}
      >
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 0 && styles.activeNavItem]}
          onPress={() => setActiveTab(0)}
        >
          <MaterialIcons 
            name="home" 
            size={26} 
            color={activeTab === 0 ? "#4f46e5" : "#64748b"} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 1 && styles.activeNavItem]}
          onPress={() => setActiveTab(1)}
        >
          <MaterialIcons 
            name="credit-card" 
            size={26} 
            color={activeTab === 1 ? "#4f46e5" : "#64748b"} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 2 && styles.activeNavItem]}
          onPress={() => setActiveTab(2)}
        >
          <MaterialIcons 
            name="notifications" 
            size={26} 
            color={activeTab === 2 ? "#4f46e5" : "#64748b"} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 3 && styles.activeNavItem]}
          onPress={() => setActiveTab(3)}
        >
          <MaterialIcons 
            name="person" 
            size={26} 
            color={activeTab === 3 ? "#4f46e5" : "#64748b"} 
          />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.header}>
        <Text style={styles.title}>Customer Card Finder</Text>
        <MaterialIcons name="contactless" size={28} color="#4f46e5" />
      </View>

      <View style={styles.searchContainer}>
        <LinearGradient
          colors={["#ffffff", "#f1f5f9"]}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter Customer ID"
            placeholderTextColor="#94a3b8"
            value={customerId}
            onChangeText={setCustomerId}
            keyboardType="numeric"
          />
          <MaterialIcons name="person-search" size={24} color="#64748b" />
        </LinearGradient>

        <TouchableOpacity 
          onPress={fetchCards} 
          style={styles.searchButton}
          disabled={isLoading}
        >
          <LinearGradient
            colors={["#4f46e5", "#6366f1"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Searching..." : "Find Cards"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {cards.length > 0 ? (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.pan}
          renderItem={({ item }) => <CardItem card={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="credit-card-off" size={48} color="#94a3b8" />
          <Text style={styles.emptyText}>No cards found</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 24,
    marginHorizontal: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: 'transparent',
  },
  activeNavItem: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: 0.5,
  },
  searchContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    marginRight: 12,
  },
  searchButton: {
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
    gap: 16,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "500",
  },
});