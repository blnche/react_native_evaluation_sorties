import { View, Text, Pressable, Image } from "react-native";
import useOutingStore from "../store/useOutingStore";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OutingItem({ outing }) {
  const favoriteIds = useOutingStore((state) => state.favoriteIds);
  const outings = useOutingStore((state) => state.outings);
  const toggleFavorite = useOutingStore((state) => state.toggleFavorite);
  const isFavorite = favoriteIds.includes(outing.id);

  return (
    <View>
        <Image source={{ uri: outing?.image ?? "https://picsum.photos/id/871/400/600" }} style={{ width: 100, height: 100 }} />
        <Pressable onPress={() => toggleFavorite(outing.id)}>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "red" : "black"} 
          />
        </Pressable>
        <Text>{outing.titre}</Text>
        <Text>{outing.categorie}</Text>
        <Text>{outing.date}</Text>
        <Text>Ville : {outing.lieu}</Text>
        <Text>Prix : {outing.prix} €</Text>
    </View>
  )
}