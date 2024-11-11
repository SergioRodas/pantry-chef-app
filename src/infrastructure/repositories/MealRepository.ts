import { Ingredient, Meal, MealDetail } from '@/domain/entities';
import { IMealRepository } from '@/domain/repositories/IMealRepository';
import { apiClient } from '../api/apiClient';

export class MealRepository implements IMealRepository {
    private ingredients: Ingredient[] = [];

    async getAllIngredients(): Promise<Ingredient[]> {
        if (this.ingredients.length === 0) {
            const response = await apiClient.get<Ingredient[]>('/ingredients');
            this.ingredients = response.data;
        }
        return this.ingredients;
    }

    async searchIngredients(query: string): Promise<Ingredient[]> {
        if (!query) return [];
        const ingredients = await this.getAllIngredients();
        return ingredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    async getMealsByIngredient(ingredient: string): Promise<Meal[]> {
        const response = await apiClient.get<Meal[]>(`/meals/${ingredient}`);
        return response.data;
    }

    async getMealDetail(id: string): Promise<MealDetail> {
        const response = await apiClient.get<MealDetail>(`/meals/detail/${id}`);
        return response.data;
    }
} 