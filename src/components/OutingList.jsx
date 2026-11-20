import { View, Text, FlatList } from "react-native";
import { Link } from "expo-router";
import OutingItem from "./OutingItem";

export default function OutingList({ outings }) {
  console.log("OutingList component rendered", outings);

  return (
    <FlatList 
      data={outings}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Link href={`/${item.id}`}>
          <OutingItem outing={item} />
        </Link>
      )}
      ListEmptyComponent={() => (
        <View>
          <Text>No outings available</Text>
        </View>
      )}
    />
  )
}