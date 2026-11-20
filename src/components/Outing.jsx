import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { chargerSortie } from "../api/sorties";

export default function Outing() {
    const { id } = useLocalSearchParams();
    const [outing, setOuting] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                <Text>Outing ID: {outing.id}</Text>
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