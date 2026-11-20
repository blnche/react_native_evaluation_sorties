import { View, Text, StyleSheet } from "react-native";
import useOutingStore from "../../../store/useOutingStore";
import OutingList from "../../../components/OutingList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const favoriteIds = useOutingStore((state) => state.favoriteIds);
  const outings = useOutingStore((state) => state.outings);
  const favoriteOutings = outings.filter((outing) => favoriteIds.includes(outing.id));

  console.log(favoriteOutings);

  return (
    <SafeAreaView>
        <Text style={styles.bigTitle}>Favorites</Text>
        <OutingList outings={favoriteOutings} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bigTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
})