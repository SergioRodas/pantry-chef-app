export interface Meal {
    id: string;
    name: string;
    thumbnail: string;
}

export interface MealIngredient {
    name: string;
    measure: string;
}

export interface MealDetail {
    id: string;
    name: string;
    category: string;
    area: string;
    instructions: string;
    thumbnail: string;
    tags: string[];
    youtube?: string;
    ingredients: MealIngredient[];
    source?: string;
} 