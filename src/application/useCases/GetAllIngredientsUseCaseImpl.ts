import { Ingredient } from '@/domain/entities';
import { IMealRepository } from '@/domain/repositories/IMealRepository';
import { GetAllIngredientsUseCase } from '@/domain/useCases/SearchIngredientsUseCase';

export class GetAllIngredientsUseCaseImpl implements GetAllIngredientsUseCase {
    constructor(private repository: IMealRepository) {}

    async execute(): Promise<Ingredient[]> {
        return this.repository.getAllIngredients();
    }
} 