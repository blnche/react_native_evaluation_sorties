import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  chargerSorties,
  choisirMode,
  modeActuel,
  MODES,
  rechercherParCategorie,
} from "../../api/sorties";
import OutingList from "../../components/OutingList";
import Screen from "../../components/Screen";
import { CATEGORIES } from "../../data/sorties";
import useOutingStore from "../../store/useOutingStore";

export default function Homepage() {
  const outings = useOutingStore((state) => state.outings);
  const setOutings = useOutingStore((state) => state.setOutings);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredOutings, setFilteredOutings] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("Toutes");
  const [modeAPI, setModeAPI] = useState(modeActuel());

  const modeActuelAPI = modeActuel();
  // console.log("Mode actuel de l'API :", modeActuelAPI, MODES);

  // console.log(CATEGORIES);
  const categories = ["Toutes", ...CATEGORIES];

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    rechercherParCategorie(categoryFilter)
      .then((data) => {
        if (!ignore) {
          setFilteredOutings(data);
          setError(null);
          setLoading(false);
          console.log(
            `Sorties filtrées par catégorie "${categoryFilter}" :`,
            data,
          );
        }
      })
      .catch((err) => {
        if (ignore) return;
        setError(err);
        setLoading(false);
        console.error(
          `Erreur lors du filtrage par catégorie "${categoryFilter}" :`,
          err,
        );
      });
  }, [categoryFilter]);

  useEffect(() => {
    setError(null);

    chargerSorties()
      .then((data) => {
        setOutings(data);
        setLoading(false);
        setFilteredOutings(data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Erreur lors du chargement des sorties :", err);
      });
  }, [modeAPI]);

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
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          {MODES.map((mode) => (
            <Pressable
              onPress={() => {
                choisirMode(mode);
                setModeAPI(mode);
                console.log("Mode choisi :", mode);
              }}
              style={{
                margin: 5,
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                backgroundColor: mode === modeAPI ? "#007bff" : "#fff",
                borderColor: mode === modeAPI ? "#007bff" : "#000",
              }}
              key={mode}
            >
              <Text
                key={mode}
                style={{ color: mode === modeAPI ? "#fff" : "#000" }}
              >
                {mode}
              </Text>
            </Pressable>
          ))}
        </View>
      </Screen>
    );

  return (
    <SafeAreaView>
      <Text style={styles.bigTitle}>Sorties</Text>
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
      >
        {MODES.map((mode) => (
          <Pressable
            onPress={() => {
              choisirMode(mode);
              setModeAPI(mode);
              console.log("Mode choisi :", mode);
            }}
            style={{
              margin: 5,
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              backgroundColor: mode === modeAPI ? "#007bff" : "#fff",
              borderColor: mode === modeAPI ? "#007bff" : "#000",
            }}
            key={mode}
          >
            <Text
              key={mode}
              style={{ color: mode === modeAPI ? "#fff" : "#000" }}
            >
              {mode}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.catContainer}>
        {categories.map((categorie) => (
          <Pressable
            key={categorie}
            onPress={() => setCategoryFilter(categorie)}
          >
            <Text>{categorie}</Text>
          </Pressable>
        ))}
      </View>
      {filteredOutings && <OutingList outings={filteredOutings} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  catContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: 10,
  },
});
