import { Ingredient, Meal, MealDetail } from '@/domain/entities';

export interface IMealRepository {
    getAllIngredients(): Promise<Ingredient[]>;
    getMealsByIngredient(ingredient: string): Promise<Meal[]>;
    getMealDetail(id: string): Promise<MealDetail>;
    searchIngredients(query: string): Promise<Ingredient[]>;
} 