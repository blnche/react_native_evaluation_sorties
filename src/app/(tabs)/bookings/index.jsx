import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bookings() {
  return (
    <SafeAreaView>
        <Text style={styles.bigTitle}>Bookings</Text>
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