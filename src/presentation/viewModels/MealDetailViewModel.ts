import { MealDetail } from '@/domain/entities';
import { GetMealDetailUseCase } from '@/domain/useCases/GetMealDetailUseCase';

export interface MealDetailState {
    meal: MealDetail | null;
    isLoading: boolean;
    error: string | null;
}

export class MealDetailViewModel {
    constructor(
        private getMealDetailUseCase: GetMealDetailUseCase,
        private setState: (state: Partial<MealDetailState>) => void
    ) {}

    async loadMealDetail(id: string): Promise<void> {
        try {
            this.setState({ isLoading: true, error: null });
            const meal = await this.getMealDetailUseCase.execute(id);
            this.setState({ meal, isLoading: false });
        } catch (error) {
            this.setState({ 
                error: error instanceof Error ? error.message : 'An error occurred',
                isLoading: false 
            });
        }
    }
} 