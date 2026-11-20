import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen({ children }) {
  return (
    <SafeAreaView>
        {children}
    </SafeAreaView>
  )
}