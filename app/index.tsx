import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { getCustomerCards } from "./services/api";
import CardItem from "./components/CardItem";

export default function HomeScreen() {
  const [customerId, setCustomerId] = useState("");
  const [cards, setCards] = useState<
    { pan: string; expiry: string; name_on_card: string; cardstatus: string; cardtype: string }[]
  >([]);

  const fetchCards = async () => {
    if (!customerId.trim()) return;
    const result = await getCustomerCards(customerId);
    setCards(
      result.map((card: { pan: string; expiry: string; name_on_card: string; cardstatus: string; cardtype: string; cardtypenetwork?: string; virtual?: string }) => ({
        pan: card.pan,
        expiry: card.expiry,
        name_on_card: card.name_on_card,
        cardstatus: card.cardstatus,
        cardtype: card.cardtype,
        cardtypenetwork: card.cardtypenetwork || "Unknown",
        virtual: card.virtual || "false",
      }))
    ); // Ensure `result` has the correct structure
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rechercher les cartes d'un client</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer l'ID du client"
        value={customerId}
        onChangeText={setCustomerId}
        keyboardType="numeric"
      />
      <Button title="Rechercher" onPress={fetchCards} />
      {cards.length > 0 && (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.pan} // Use a unique property like `pan`
          renderItem={({ item }) => <CardItem card={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
