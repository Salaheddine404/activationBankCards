import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardProps {
  card: {
    accountnumber: string;
    card: number;
    pan: string;
    expiry: string;
    name_on_card: string;
    cardstatus: string;
    cardtype: string;
    cardcurrency: string;
    cardtypenetwork: string;
    virtual: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  const isActive = card.cardstatus.toLowerCase() === "active";

  return (
    <View style={[styles.cardContainer, isActive ? styles.activeCard : styles.inactiveCard]}>
      <Text style={styles.name}>{card.name_on_card}</Text>
      <Text style={styles.pan}>💳 {card.pan}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.info}>{card.cardtypenetwork} - {card.cardcurrency}</Text>
        <Text style={styles.expiry}>Exp: {card.expiry}</Text>
      </View>
      <Text style={styles.status}>{isActive ? "🟢 Active" : "🔴 Désactivée"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    overflow: "hidden",
  },
  activeCard: {
    backgroundColor: "#007bff",
  },
  inactiveCard: {
    backgroundColor: "#6c757d",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  pan: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8f9fa",
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#f1f1f1",
  },
  expiry: {
    fontSize: 14,
    color: "#fff",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 4,
    borderRadius: 5,
    color: "#fff",
  },
});

export default Card;