import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, Text, View } from "react-native";
import useOutingStore from "../store/useOutingStore";

export default function OutingItem({ outing }) {
  const favoriteIds = useOutingStore((state) => state.favoriteIds);
  const outings = useOutingStore((state) => state.outings);
  const toggleFavorite = useOutingStore((state) => state.toggleFavorite);
  const isFavorite = favoriteIds.includes(outing.id);

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: outing?.image ?? "https://picsum.photos/id/871/400/600",
            }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text>{outing.titre}</Text>
            <Text>{outing.categorie}</Text>
            <Text>{outing.date}</Text>
            <Text>Ville : {outing.lieu}</Text>
            <Text>Prix : {outing.prix} €</Text>
          </View>
        </View>

        <Pressable onPress={() => toggleFavorite(outing.id)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "red" : "black"}
          />
        </Pressable>
      </View>
    </View>
  );
}
