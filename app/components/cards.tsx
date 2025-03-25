import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardProps {
  card: { pan: string; expiry: string; name_on_card: string; cardstatus: string; cardtype: string };
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>PAN: {card.pan}</Text>
      <Text style={styles.cardText}>Expiry: {card.expiry}</Text>
      <Text style={styles.cardText}>Name: {card.name_on_card}</Text>
      <Text style={styles.cardText}>Status: {card.cardstatus}</Text>
      <Text style={styles.cardText}>Type: {card.cardtype}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { padding: 16, backgroundColor: "#ffffff", borderRadius: 12, marginVertical: 8 },
  cardText: { fontSize: 16, color: "#1e293b" },
});

export default Card;
