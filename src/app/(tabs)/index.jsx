import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import useOutingStore from "../../store/useOutingStore";
import { chargerSorties, modeActuel, MODES, choisirMode } from "../../api/sorties";
import OutingList from "../../components/OutingList";
import Screen from "../../components/Screen";

export default function Homepage() {
  const outings = useOutingStore((state) => state.outings);
  const setOutings = useOutingStore((state) => state.setOutings);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const modeActuelAPI = modeActuel(); 
  console.log("Mode actuel de l'API :", modeActuelAPI, MODES);

  useEffect(() => {
    setError(null);

    chargerSorties()
      .then((data) => {
        setOutings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Erreur lors du chargement des sorties :", err);
      })
  },[]);

  if (loading) 
    return (
      <Screen>
        <Text>Loading...</Text>
      </Screen>  
    );
  
  if (error)
    return (
      <Screen>
        <Text>{error.message}</Text>
      </Screen>
    )

  return (
    <View>
      <Text>Sorties</Text>
      {/* <View>
        <Text>Mode actuel de l'API : {modeActuelAPI}</Text>
        {MODES.map((mode) => (
          <Pressable onPress={choisirMode}>
            <Text key={mode}>{mode}</Text>
          </Pressable>
        ))}
      </View> */}
      {outings && (
        <OutingList outings={outings} />
      )}
    </View>
  )
}