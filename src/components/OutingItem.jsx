import { View, Text } from "react-native";

export default function OutingItem({ outing }) {
  console.log("outing", outing);

  return (
    <View>
        <Text>{outing.titre}</Text>
    </View>
  )
}