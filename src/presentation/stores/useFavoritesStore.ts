import { MealDetail } from '@/domain/entities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: MealDetail[];
    addFavorite: (meal: MealDetail) => void;
    removeFavorite: (id: string) => void;
    clearFavorites: () => void;
    isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (meal) => 
                set((state) => ({
                    favorites: [...state.favorites, meal]
                })),
            removeFavorite: (id) =>
                set((state) => ({
                    favorites: state.favorites.filter((meal) => meal.id !== id)
                })),
            clearFavorites: () => set({ favorites: [] }),
            isFavorite: (id) => 
                get().favorites.some((meal) => meal.id === id),
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
); 