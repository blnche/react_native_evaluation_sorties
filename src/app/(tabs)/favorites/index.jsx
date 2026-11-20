import { View, Text } from "react-native";
import useOutingStore from "../../../store/useOutingStore";
import OutingList from "../../../components/OutingList";

export default function Favorites() {
  const favoriteIds = useOutingStore((state) => state.favoriteIds);
  const outings = useOutingStore((state) => state.outings);
  const favoriteOutings = outings.filter((outing) => favoriteIds.includes(outing.id));

  console.log(favoriteOutings);

  return (
    <View>
        <Text>Favorites</Text>
        <OutingList outings={favoriteOutings} />
    </View>
  )
}