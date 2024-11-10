import { Ingredient, Meal, MealDetail } from '@/domain/entities';
import { IMealRepository } from '@/domain/repositories/IMealRepository';

export class MealService {
    constructor(private repository: IMealRepository) {}

    async getIngredients(): Promise<Ingredient[]> {
        return await this.repository.getAllIngredients();
    }

    async searchMealsByIngredient(ingredient: string): Promise<Meal[]> {
        return await this.repository.getMealsByIngredient(ingredient);
    }

    async getMealDetails(id: string): Promise<MealDetail> {
        return await this.repository.getMealDetail(id);
    }
} 