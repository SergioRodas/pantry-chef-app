import { Ingredient } from '@/domain/entities';

export interface GetAllIngredientsUseCase {
    execute(): Promise<Ingredient[]>;
}

export interface SearchIngredientsUseCase {
    execute(query: string): Promise<Ingredient[]>;
} 