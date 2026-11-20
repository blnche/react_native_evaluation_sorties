import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import useOutingStore from "../../store/useOutingStore";
import { chargerSorties } from "../../api/sorties";
import OutingList from "../../components/OutingList";
import Screen from "../../components/Screen";

export default function Homepage() {
  const outings = useOutingStore((state) => state.outings);
  const setOutings = useOutingStore((state) => state.setOutings);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(null);
    
    chargerSorties()
      .then((data) => {
        setOutings(data);
        // console.log("Sorties chargées :", data);
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
      <Text>Home</Text>
      {outings && (
        <OutingList outings={outings} />
      )}
    </View>
  )
}