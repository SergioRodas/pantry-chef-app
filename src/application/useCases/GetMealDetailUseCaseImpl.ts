import { MealDetail } from '@/domain/entities';
import { IMealRepository } from '@/domain/repositories/IMealRepository';
import { GetMealDetailUseCase } from '@/domain/useCases/GetMealDetailUseCase';

export class GetMealDetailUseCaseImpl implements GetMealDetailUseCase {
    constructor(private repository: IMealRepository) {}

    async execute(id: string): Promise<MealDetail> {
        return this.repository.getMealDetail(id);
    }
} 