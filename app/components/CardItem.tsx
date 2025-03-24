import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

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
  const [isActive, setIsActive] = useState(card.cardstatus.toLowerCase() === "active");
  const scaleValue = new Animated.Value(1);
  const rotateValue = new Animated.Value(0);

  const toggleCardStatus = () => {
    // Spring animation sequence
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.9,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(rotateValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsActive(!isActive);
      scaleValue.setValue(1);
      rotateValue.setValue(0);
    });
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', isActive ? '-360deg' : '360deg']
  });

  const formatCardNumber = (pan: string) => {
    const lastFour = pan.slice(-4);
    return `••••  ••••  ••••  ${lastFour}`;
  };

  const formatExpiry = (expiry: string) => {
    return expiry.replace(/(\d{2})(\d{2})/, "$1/$2");
  };

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={isActive ? ["#4f46e5", "#6366f1"] : ["#475569", "#334155"]}
        start={[0.1, 0.1]}
        end={[0.9, 0.9]}
        style={styles.card}
      >
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <MaterialIcons 
            name={card.cardtype === "Visa" ? "credit-card" : "account-balance"} 
            size={24} 
            color="rgba(255,255,255,0.9)" 
          />
          <View style={styles.statusContainer}>
            <Animated.View style={[styles.statusLED, isActive && styles.activeLED, {
              transform: [{ scale: scaleValue }]
            }]} />
            <Text style={styles.statusText}>
              {isActive ? "Active" : "Inactive"}
            </Text>
          </View>
        </View>

        {/* Card Number */}
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>{formatCardNumber(card.pan)}</Text>
          <MaterialIcons name="sim-card" size={28} color="rgba(255,255,255,0.7)" />
        </View>

        {/* Card Details */}
        <View style={styles.cardDetails}>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>CARD HOLDER</Text>
            <Text style={styles.detailValue}>{card.name_on_card.toUpperCase()}</Text>
          </View>
          <View style={styles.detailColumn}>
            <Text style={styles.detailLabel}>EXPIRES</Text>
            <Text style={styles.detailValue}>{formatExpiry(card.expiry)}</Text>
          </View>
        </View>

        {/* Icon Activation Control */}
        <Animated.View style={[styles.iconButtonContainer, {
          transform: [
            { scale: scaleValue },
            { rotate: rotateInterpolate }
          ]
        }]}>
          <TouchableOpacity 
            onPress={toggleCardStatus}
            activeOpacity={0.9}
            style={styles.iconButton}
          >
            <LinearGradient
              colors={isActive ? ["#4ade80", "#22c55e"] : ["#ef4444", "#dc2626"]}
              style={styles.iconGradient}
            >
              <FontAwesome5 
                name={isActive ? "unlock-alt" : "lock"} 
                size={20} 
                color="#fff" 
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: "hidden",
  },
  card: {
    padding: 24,
    height: 240,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusLED: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ef4444",
  },
  activeLED: {
    backgroundColor: "#4ade80",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: "300",
    opacity: 0.9,
  },
  cardDetails: {
    flexDirection: "row",
    gap: 32,
    marginBottom: 28,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  iconButtonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  iconButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  iconGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});

export default CardItem;