import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { getCustomerCards } from "../services/api";
import CardItem from "../components/CardItem";

export default function HomeScreen() {
  const [customerId, setCustomerId] = useState("");
  const [cards, setCards] = useState<{ pan: string; expiry: string; name_on_card: string; cardstatus: string; cardtype: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Ajout de l'état pour l'erreur

  const fetchCards = async () => {
    setErrorMessage(""); // Réinitialiser l'erreur avant la requête
    if (!customerId.trim()) {
      setErrorMessage("Veuillez entrer un Customer ID.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await getCustomerCards(customerId);
      if (result.length === 0) {
        setErrorMessage("Aucune carte trouvée.");
      }
      setCards(result);
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de la récupération des cartes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.background}>
      <LinearGradient colors={["rgba(160, 116, 116, 0.9)", "rgba(53, 24, 24, 0.06)"]} style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Customer Card Finder</Text>
            <MaterialIcons name="contactless" size={28} color="#4f46e5" />
          </View>

          <View style={styles.searchContainer}>
            <LinearGradient colors={["#ffffff", "#f1f5f9"]} style={styles.inputContainer}>
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

            <TouchableOpacity onPress={fetchCards} style={styles.searchButton} disabled={isLoading}>
              <LinearGradient colors={["#4f46e5", "#6366f1"]} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>{isLoading ? "Searching..." : "Find Cards"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Affichage du message d'erreur si il y en a */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <FlatList
            data={cards}
            keyExtractor={(item) => item.pan}
            renderItem={({ item }) => <CardItem card={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
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
    backgroundColor: "rgba(0,0,0,0.3)", // Ajoute une légère opacité pour un effet propre
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
  searchContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
});
