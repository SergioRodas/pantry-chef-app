import { MealDetail } from '@/domain/entities';

export interface GetMealDetailUseCase {
    execute(id: string): Promise<MealDetail>;
} 