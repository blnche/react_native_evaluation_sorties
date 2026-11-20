import { View, Text, Pressable, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { chargerSortie } from "../api/sorties";
import useOutingStore from "../store/useOutingStore";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Outing() {
    const { id } = useLocalSearchParams();
    const [outing, setOuting] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const favoriteIds = useOutingStore((state) => state.favoriteIds);
    const toggleFavorite = useOutingStore((state) => state.toggleFavorite);
    const isFavorite = favoriteIds.includes(outing?.id);

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        handleFetch();
    }

    const handleFetch = () => {
        chargerSortie(id)
            .then(data => {
                setOuting(data);
                setLoading(false);
                console.log("Sortie chargée :", data);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
                console.error("Erreur lors du chargement de la sortie :", err);
            })
    }
    
    useEffect(() => {
        handleFetch();
        return () => {
            setError(null);
        }
    }, []);

    if (loading) 
        return (
            <Text>Loading...</Text>
        );
    
    if (error)
        return (
            <View>
                <Text>{error.message}</Text>
                <Pressable onPress={handleRetry}>
                    <Text>Réessayer</Text>
                </Pressable>
            </View>
        )

    return (
        <View>
            {outing ? (
                <>
                    <Text>{outing.titre}</Text>
                    <Image source={{ uri: outing?.image ?? "https://picsum.photos/id/871/400/600" }} style={{ width: 100, height: 100 }} />
                    <Pressable onPress={() => toggleFavorite(outing.id)}>
                        <Ionicons 
                            name={isFavorite ? "heart" : "heart-outline"} 
                            size={24} 
                            color={isFavorite ? "red" : "black"} 
                        />
                    </Pressable>
                    <Text>{outing.categorie}</Text>
                    <Text>{outing.date}</Text>
                    <Text>Ville : {outing.lieu}</Text>
                    <Text>Prix : {outing.prix}€</Text>
                    <Text>Places restantes : {outing.placesRestantes}</Text>
                </>
            ) : (
                <View>
                    <Text>Outing not found</Text>
                    <Pressable onPress={handleRetry}>
                        <Text>Réessayer</Text>
                    </Pressable>
                </View>
            )}
            
        </View>
    )
}