import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { getCustomerCards } from "../services/api";
import CardItem from "../components/CardItem";
import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();

  const [cards, setCards] = useState<{ pan: string; expiry: string; name_on_card: string; cardstatus: string; cardtype: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCards = useCallback(async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const result = await getCustomerCards(customerId);
      if (result.length === 0) {
        setErrorMessage("No cards found for this customer ID.");
      }
      setCards(result);
    } catch (error) {
      setErrorMessage("An error occurred while fetching the cards.");
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <ImageBackground 
      source={require("../assets/background.jpg")} 
      style={styles.background}
    >
      <LinearGradient 
        colors={["rgba(160, 116, 116, 0.9)", "rgba(53, 24, 24, 0.06)"]} 
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Customer Cards</Text>
            <MaterialIcons name="contactless" size={28} color="#4f46e5" />
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text style={styles.loadingText}>Loading cards...</Text>
            </View>
          ) : errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : (
            <FlatList
              data={cards}
              keyExtractor={(item) => item.pan}
              renderItem={({ item }) => <CardItem card={item} />}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  container: {
    flex: 1,
    padding: 24,
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
    color: "#fff",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#fff",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 40,
  },
});
