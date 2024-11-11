import { Ingredient } from '@/domain/entities';
import { IMealRepository } from '@/domain/repositories/IMealRepository';
import { SearchIngredientsUseCase } from '@/domain/useCases/SearchIngredientsUseCase';

export class SearchIngredientsUseCaseImpl implements SearchIngredientsUseCase {
    constructor(private repository: IMealRepository) {}

    async execute(query: string): Promise<Ingredient[]> {
        if (!query) return [];
        return this.repository.searchIngredients(query);
    }
} 