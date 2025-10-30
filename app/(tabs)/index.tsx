// app/(tabs)/index.tsx
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const services = [
    { id: "1", label: "Agendar doação" },
    { id: "2", label: "Doação de medula" },
    { id: "3", label: "Carteira de doação" },
    { id: "4", label: "Histórico de doação" },
    { id: "5", label: "Agenda campanha" },
  ];

  function handleServicePress(serviceId: string) {
    if (serviceId === "1") {
      // Abre a página de pré-triagem
      router.push("/(tabs)/PreTriagem");
    } else {
      // Futuramente você pode colocar outras ações aqui
      console.log("Serviço ainda não implementado:", serviceId);
    }
  }

  return (
    <View style={style.body}>
      <View style={style.content}>
        <View style={style.graphics}>
          <View style={style.cardsText}>
            <Text style={style.title}>Olá, Diogo!</Text>
          </View>

          <LinearGradient
            colors={["#D32F2F", "#720808"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={style.cards}
          >
            <Text style={style.cardtitle}>23</Text>
            <Text style={style.cardText}>dias para sua próxima doação</Text>
          </LinearGradient>
        </View>

        <View style={style.section}>
          <View style={style.row}>
            <LinearGradient
              colors={["#D32F2F", "#720808"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={style.cards}
            >
              <Text style={style.cardtitle}>A+</Text>
              <Text style={style.cardText}>Seu tipo sanguíneo</Text>
            </LinearGradient>

            <LinearGradient
              colors={["#D32F2F", "#720808"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={style.cards}
            >
              <Text style={style.cardtitle}>5</Text>
              <Text style={style.cardText}>Doações já feitas</Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      <View style={style.services}>
        <Text style={style.sectionTitle}>Serviços</Text>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 44 }}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.serviceItem}
              onPress={() => handleServicePress(item.id)}
            >
              <View style={style.serviceCard} />
              <Text style={style.serviceLabel} numberOfLines={2}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  body: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 44,
  },

  content: {
    width: "100%",
    paddingTop: 0,
    paddingBottom: 10,
    padding: 50,
  },

  graphics: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "flex-start",
    marginTop: 30,
  },

  section: {
    width: "100%",
  },

  cards: {
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },

  cardText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardtitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "black",
  },
  cardsText: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 23,
    marginBottom: 12,
  },

  serviceItem: {
    width: 98,
  },

  serviceCard: {
    width: 98,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#CBCACA",
    justifyContent: "center",
    alignItems: "center",
  },

  serviceLabel: {
    marginTop: 8,
    fontSize: 16,
    color: "#000000",
    lineHeight: 16,
    textAlign: "center",
  },
  services: {
    paddingTop: 0,
    padding: 10,
  },
});
