import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { chargerSortie } from "../api/sorties";

export default function Outing() {
    const { id } = useLocalSearchParams();
    const [outing, setOuting] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setError(null);

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
    }, []);

    if (loading) 
        return (
            <Text>Loading...</Text>
        );
    
    if (error)
        return (
            <Text>{error.message}</Text>
        )

    // Erreur si no outing found

    return (
        <View>
            {outing ? (
                <Text>Outing ID: {outing.id}</Text>
            ) : (
                <View>
                    <Text>Outing not found</Text>
                    <Pressable>Réessayer</Pressable>
                </View>
            )}
            
        </View>
    )
}