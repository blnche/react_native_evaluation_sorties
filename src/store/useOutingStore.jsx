import { create } from "zustand";

const useOutingStore = create((set) => ({
    outings: [],
    setOutings: (outings) => set({ outings }),

    favoriteIds: [],
    setFavoriteIds: (favoriteIds) => set({ favoriteIds }),

    toggleFavorite: (id) => set((state) => {
        const isFavorite = state.favoriteIds.includes(id);
        return {
            favoriteIds: isFavorite ? state.favoriteIds.filter((x) => x !== id) : [...state.favoriteIds, id],
        };
    })
}))

export default useOutingStore;