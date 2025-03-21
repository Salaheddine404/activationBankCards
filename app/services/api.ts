import axios from "axios";

// Définir l'URL de l'API
const BASE_URL = "http://10.192.84.3:8090/smartbranch/api/lib/cardlist";

export const getCustomerCards = async (customerId: string) => {
  try {
    const response = await axios.post(BASE_URL, {
      header: {
        idmsg: "000000000104",
        mac: "bcecfa664e12edca",
      },
      filter: {
        account: "",
        card: "",
        pan: "",
        customer: customerId,
        name_on_card: "",
        institution: "7601",
        start: "1",
        end: "100", // Augmenter si besoin plus de cartes
      },
    });

    return response.data.body.cards;
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
};