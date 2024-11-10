import { Ingredient, Meal, MealDetail } from '@/domain/entities';
import { IMealRepository } from '@/domain/repositories/IMealRepository';
import { apiClient } from '../api/apiClient';

export class MealRepository implements IMealRepository {
    async getAllIngredients(): Promise<Ingredient[]> {
        const response = await apiClient.get<Ingredient[]>('/ingredients');
        return response.data;
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