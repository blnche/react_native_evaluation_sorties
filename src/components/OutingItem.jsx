import { View, Text, Pressable } from "react-native";
import useOutingStore from "../store/useOutingStore";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function OutingItem({ outing }) {
  const favoriteIds = useOutingStore((state) => state.favoriteIds);
  const outings = useOutingStore((state) => state.outings);
  const toggleFavorite = useOutingStore((state) => state.toggleFavorite);
  const isFavorite = favoriteIds.includes(outing.id);

  return (
    <View>
        <Text>{outing.titre}</Text>
        <Pressable onPress={() => toggleFavorite(outing.id)}>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? "red" : "black"} 
          />
        </Pressable>
    </View>
  )
}