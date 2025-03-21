import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CardItemProps {
  card: {
    pan: string;
    expiry: string;
    name_on_card: string;
    cardstatus: string;
    cardtype: string;
  };
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  // État local pour gérer l'activation/désactivation
  const [isActive, setIsActive] = useState(card.cardstatus.toLowerCase() === "active");

  // Fonction pour basculer l'état de la carte
  const toggleCardStatus = () => {
    setIsActive(!isActive);
  };

  return (
    <LinearGradient
      colors={isActive ? ["#007bff", "#0056b3"] : ["#6c757d", "#495057"]}
      style={styles.card}
    >
      <Text style={styles.cardTitle}>{card.name_on_card}</Text>
      <Text style={styles.text}>Numéro: {card.pan}</Text>
      <Text style={styles.text}>Expiration: {card.expiry}</Text>
      <Text style={styles.text}>Type: {card.cardtype}</Text>
      
      <TouchableOpacity style={styles.button} onPress={toggleCardStatus}>
        <Text style={styles.buttonText}>
          {isActive ? "Désactiver 🔴" : "Activer 🟢"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#fff",
  },
  button: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default CardItem;
